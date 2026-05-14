const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

function getErrorMessage(data: any) {
  if (typeof data?.detail === "string") return data.detail;
  if (Array.isArray(data?.detail)) return data.detail.join(" ");
  if (typeof data?.message === "string") return data.message;

  if (data && typeof data === "object") {
    const messages = Object.entries(data).flatMap(([field, value]) => {
      const text = Array.isArray(value) ? value.join(" ") : String(value);
      return field === "non_field_errors" ? text : `${field}: ${text}`;
    });

    if (messages.length > 0) return messages.join(" ");
  }

  return "Something went wrong";
}

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data;
}

export const authApi = {
  login: (credentials: any) => 
    apiRequest('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  register: (userData: any) => 
    apiRequest('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  verifyEmail: (verificationData: { uid: string; token: string }) =>
    apiRequest('/auth/verify-email/', {
      method: 'POST',
      body: JSON.stringify(verificationData),
    }),
  forgotPassword: (data: { email: string }) =>
    apiRequest('/auth/forgot-password/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  resetPassword: (data: { uid: string; token: string; password: string }) =>
    apiRequest('/auth/reset-password/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getMe: (token: string) => 
    apiRequest('/auth/me/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
