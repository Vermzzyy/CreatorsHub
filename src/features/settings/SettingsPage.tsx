import { useState, useEffect, useRef } from "react";
import AuthNavbar from "../../shared/components/AuthNavbar";
import { getProfile, updatePassword, uploadProfilePhoto } from "./api/userApi";
import './Settings.css'

function SettingsPage() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [photoMessage, setPhotoMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    const loggedInEmail = localStorage.getItem("loggedInEmail") || "";
    if (loggedInEmail) {
      setEmail(loggedInEmail);
    } // Set it early so it doesn't stay blank if the API crashes!

    try {

      const profile = await getProfile();
      console.log("Fetched Profile Data:", profile);

      // If backend nests data inside a "data" object
      const data = profile.data ? profile.data : profile;

      setFirstName(data.firstName || data.name || "");
      setLastName(data.lastName || "");
      
      // Update with API email if available
      setEmail(data.email || data.username || loggedInEmail);
      setProfilePhoto(data.profilePhoto || data.avatarUrl || data.photo || null);

    } catch (err: any) {
      console.error("Failed to load profile via API, applying fallback. Error:", err);
      setMessage("Note: Profile API unavailable (" + (err.message || "Unknown error") + ")");

    }

  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setPhotoMessage("Please select a JPG, PNG, or WebP image.");
      setTimeout(() => setPhotoMessage(""), 3000);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoMessage("Image must be under 5MB.");
      setTimeout(() => setPhotoMessage(""), 3000);
      return;
    }

    // Show local preview immediately
    const previewUrl = URL.createObjectURL(file);
    setProfilePhoto(previewUrl);

    setUploading(true);
    setPhotoMessage("");

    try {

      const result = await uploadProfilePhoto(file);

      setProfilePhoto(result.profilePhoto || previewUrl);
      setPhotoMessage("Photo updated successfully!");

    } catch (err: any) {

      setPhotoMessage(err.message || "Failed to upload photo.");

    } finally {

      setUploading(false);
      setTimeout(() => setPhotoMessage(""), 3000);

    }

  };

  const handleUpdate = async () => {

    setMessage("");

    try {

      await updatePassword({
        currentPassword,
        newPassword,
        confirmPassword
      });

      setMessage("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err: any) {

      setMessage(err.message);

    }

  };

  const getInitials = () => {
    const first = firstName.charAt(0).toUpperCase();
    const last = lastName.charAt(0).toUpperCase();
    return first + last || "?";
  };

  return (
    <div>

      <AuthNavbar />

      <div className="settings-container">

        <div className="settings-card">

          <div className="settings-header">
            SETTINGS
          </div>

          <div className="settings-body">

            {/* Profile Photo Section */}
            <div className="profile-section">

              <div className="profile-photo-wrapper" onClick={handlePhotoClick}>
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="profile-photo"
                  />
                ) : (
                  <div className="profile-photo-placeholder">
                    {getInitials()}
                  </div>
                )}
                <div className="photo-overlay">
                  <span className="photo-overlay-icon">📷</span>
                  <span className="photo-overlay-text">
                    {uploading ? "Uploading..." : "Change Photo"}
                  </span>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="photo-input-hidden"
                onChange={handlePhotoUpload}
              />

              <div className="profile-info">
                <h2 className="profile-name">{firstName} {lastName}</h2>
                <p className="profile-email">{email}</p>
              </div>

              {photoMessage && (
                <p className={`photo-message ${photoMessage.includes("success") ? "success" : "error"}`}>
                  {photoMessage}
                </p>
              )}

            </div>

            <hr className="settings-divider" />

            {/* Password Section */}
            <h3>Change Password</h3>
            <p className="settings-sub">Update your account password</p>

            <label>Email</label>
            <input
              type="email"
              value={email}
              disabled
            />

            <label>Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e)=>setCurrentPassword(e.target.value)}
            />

            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />

            {message && (
              <p className={`settings-message ${message.includes("success") ? "success" : "error"}`}>
                {message}
              </p>
            )}

            <button
              className="confirm-btn"
              onClick={handleUpdate}
            >
              Confirm Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SettingsPage;
