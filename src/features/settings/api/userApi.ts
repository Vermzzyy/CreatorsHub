import { supabase } from "../../../supabaseClient";

const USER_API = "https://creatorsbackend-6f3r.onrender.com/api/v1/user";

export const getProfile = async () => {

  const token = localStorage.getItem("token");

  const response = await fetch(`${USER_API}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};

export const updatePassword = async (data: any) => {

  const token = localStorage.getItem("token");

  const response = await fetch(`${USER_API}/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const result = await response.text();

  if (!response.ok) {
    try {
      const errorObj = JSON.parse(result);
      throw new Error(errorObj.message || "An unexpected error occurred.");
    } catch (e) {
      if (result && !result.startsWith("{")) {
        throw new Error(result);
      }
      throw new Error("Failed to update password. Please try again later.");
    }
  }

  return result;
};

export const uploadProfilePhoto = async (file: File) => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("loggedInEmail") || "user";
  
  const fileName = `${email}-${Date.now()}-${file.name}`;
const { error: uploadError } = await supabase.storage
  .from('profiles')
  .upload(fileName, file);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('profiles')
    .getPublicUrl(fileName);

  const response = await fetch(`${USER_API}/profile/photo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ profilePictureUrl: publicUrl })
  });

  const resultText = await response.text();
  let result;
  try {
    result = JSON.parse(resultText);
  } catch (e) {
    result = { message: "Server error occurred during upload." };
  }

  if (!response.ok) {
    throw new Error(result.message || "Upload failed. Please try again.");
  }

  return { profilePhoto: publicUrl };
};
