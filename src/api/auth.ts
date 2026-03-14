const API_URL = "http://localhost:8080/api/v1/auth";

export const loginUser = async (email: string, password: string) => {

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};


export const registerUser = async (data: any) => {

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
};

const USER_API = "http://localhost:8080/api/v1/user";

export const getProfile = async () => {

  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8080/api/v1/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

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