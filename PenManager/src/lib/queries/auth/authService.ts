import axios from "axios";
import { saveToken, getToken, TOKEN_ID } from "../token";

interface LoginParams {
  url: string;
  email: string;
  password: string;
}

interface RegisterParams {
  url: string;
  email: string;
  password: string;
  name?: string;
}

interface AuthResponse {
  status: number;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: string;
      planType: string;
      subscriptionStatus: string;
    };
    token: string;
  };
}

export const authService = {
  async login({ url, email, password }: LoginParams): Promise<AuthResponse | null> {
    try {
      const { data } = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });

      if (data.status === 200) {
        await saveToken({
          url,
          token: data.data.token,
          version: data.data.user.role,
        });

        // Save user info
        localStorage.setItem('user', JSON.stringify(data.data.user));

        return data;
      }

      return null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  async register({ url, email, password, name }: RegisterParams): Promise<AuthResponse | null> {
    try {
      const { data } = await axios.post(`${url}/auth/register`, {
        email,
        password,
        name,
      });

      if (data.status === 201) {
        await saveToken({
          url,
          token: data.data.token,
          version: data.data.user.role,
        });

        // Save user info
        localStorage.setItem('user', JSON.stringify(data.data.user));

        return data;
      }

      return null;
    } catch (error) {
      console.error('Register error:', error);
      return null;
    }
  },

  async getProfile(url: string): Promise<any> {
    try {
      const token = getToken(TOKEN_ID.TOKEN);
      if (!token) return null;

      const { data } = await axios.get(`${url}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.status === 200 ? data.data : null;
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  },

  async getInstanceLimit(url: string): Promise<any> {
    try {
      const token = getToken(TOKEN_ID.TOKEN);
      if (!token) return null;

      const { data } = await axios.get(`${url}/auth/instance-limit`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.status === 200 ? data.data : null;
    } catch (error) {
      console.error('Get instance limit error:', error);
      return null;
    }
  },

  async getUserInstances(url: string): Promise<any[]> {
    try {
      const token = getToken(TOKEN_ID.TOKEN);
      if (!token) return [];

      const { data } = await axios.get(`${url}/auth/instances`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.status === 200 ? data.data : [];
    } catch (error) {
      console.error('Get user instances error:', error);
      return [];
    }
  },

  async getPlans(url: string): Promise<any[]> {
    try {
      const { data } = await axios.get(`${url}/auth/plans`);

      return data.status === 200 ? data.data : [];
    } catch (error) {
      console.error('Get plans error:', error);
      return [];
    }
  },

  logout() {
    localStorage.removeItem(TOKEN_ID.TOKEN);
    localStorage.removeItem(TOKEN_ID.API_URL);
    localStorage.removeItem(TOKEN_ID.VERSION);
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!getToken(TOKEN_ID.TOKEN);
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getAuthHeader() {
    const token = getToken(TOKEN_ID.TOKEN);
    return token ? `Bearer ${token}` : null;
  },
};