import { authApi } from "../lib/api";
import { useAuthStore } from "../store/authStore";
import type { LoginPayload, RegisterPayload } from "../types";

export function useAuth() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const register = async (payload: RegisterPayload) => {
    const response = await authApi.register(payload);
    setAuth({
      token: response.data.token,
      user: response.data.user
    });
    return response.data;
  };

  const login = async (payload: LoginPayload) => {
    const response = await authApi.login(payload);
    setAuth({
      token: response.data.token,
      user: response.data.user
    });
    return response.data;
  };

  const logout = () => {
    clearAuth();
  };

  const fetchMe = async () => {
    if (!token) return null;
    const response = await authApi.me(token);
    return response.data.user;
  };

  return {
    token,
    user,
    register,
    login,
    logout,
    fetchMe,
    isAuthenticated: Boolean(token)
  };
}