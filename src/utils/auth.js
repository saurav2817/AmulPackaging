const TOKEN_KEY = 'adminAuthToken';
const USERNAME_KEY = 'adminUsername';
const API_BASE_URL = '/api';

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem(TOKEN_KEY));
};

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const getAdminUsername = () => localStorage.getItem(USERNAME_KEY) || '';

export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/admin_login.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Login failed');
  }

  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USERNAME_KEY, data.user?.username || username);

  return data;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
};

