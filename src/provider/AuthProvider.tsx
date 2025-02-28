import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api";
import { ProfileType } from "../component/Profile";
import { AxiosResponse } from "axios";
interface ContextType {
  token: string | null;
  user: User | null;
  login: (newToken: string) => void;
  logout: () => void;
  saveUserInfo: (newUserInfo: Partial<ProfileType>) => void;
}
interface User {
  id: string;
  name: string;
  email: string;
  age: string;
  role: "ADMIN" | "USER";
}
export const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      if (token) {
        const user = await fetchUser(token);
        if (user) setUser(user);
      }
    };
    getToken();
  }, [token]);
  const fetchUser = async (accessToken: string): Promise<User | null> => {
    try {
      const res = await api.get("/user/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.data.data;
    } catch (error) {
      console.error("Error fetching user data", error);
      logout(); // ถ้าโหลดข้อมูลผู้ใช้ไม่สำเร็จ ให้ล็อกเอาท์
      return null;
    }
  };
  const login = async (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    setToken(accessToken);
    const user = await fetchUser(accessToken);
    if (user) {
      setUser(user);
      if (user.role == "ADMIN") {
        navigate("/dashboardAdmin");
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  const saveUserInfo = async (newUserInfo: Partial<ProfileType>) => {
    try {
      const res = await api.put<
        ProfileType,
        AxiosResponse<{ success: boolean; data: User }>
      >("/user", newUserInfo);
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };
  const contextValue = useMemo(
    () => ({
      token,
      user,
    }),
    [token, user]
  );
  return (
    <AuthContext.Provider
      value={{ ...contextValue, login, logout, saveUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
