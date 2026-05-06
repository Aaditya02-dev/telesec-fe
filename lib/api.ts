const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
    throw new Error(data.detail || data.message || 'Something went wrong');
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
  getMe: (token: string) => 
    apiRequest('/auth/me/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
