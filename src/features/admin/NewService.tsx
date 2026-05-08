import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "../../supabaseClient";
import "./Admin.css";

const API_BASE = "https://creatorshub-backend.onrender.com/api/v1/services";

export default function NewService() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!title || !category || !price) {
      setError("Title, category, and price are required.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      let imageUrl = "";

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `service-thumbnails/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('services')
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error("Failed to upload image: " + uploadError.message);
        }

        const { data: urlData } = supabase.storage
          .from('services')
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      }

      const token = localStorage.getItem("token");
      const body = {
        title,
        description,
        category,
        price,
        thumbnail: imageUrl,
        tags: tags.split(",").map((t) => t.trim()).filter((t) => t),
      };

      const res = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/admin"), 1500);
      } else {
        const msg = await res.text();
        setError(msg || "Failed to create service.");
      }
    } catch (err) {
      setError("Network error. Is the backend running?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-content">

        <h2>New Service</h2>
        <p className="admin-content-subtitle">Add a new service to your marketplace</p>

        <div className="new-service-card">

          <h3>Service Details</h3>

          {error && <p style={{ color: "#ff6b6b", marginBottom: 12 }}>{error}</p>}
          {success && <p style={{ color: "#51cf66", marginBottom: 12 }}>✅ Service created! Redirecting...</p>}

          <label>Service Title</label>
          <input
            type="text"
            placeholder="Enter a service title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>
          <textarea
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="form-row">

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="e.g. UI/UX"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Price</label>
              <input
                type="text"
                placeholder="e.g. ₱3,000 – ₱7,000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

          </div>

          <label>Tags (comma-separated)</label>
          <input
            type="text"
            placeholder="e.g. Figma, Responsive, Modern"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <label>Service Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />

          <button
            className="add-btn"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "ADDING..." : "ADD SERVICE"}
          </button>

        </div>

      </div>

    </div>
  );
}
