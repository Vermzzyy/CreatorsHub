const USER_API = "http://localhost:8080/api/v1/user";

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
    throw new Error(result);
  }

  return result;
};

export const uploadProfilePhoto = async (file: File) => {

  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${USER_API}/profile/photo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Upload failed");
  }

  return result;
};
