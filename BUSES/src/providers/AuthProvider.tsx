import React, { createContext, ReactNode, useState } from "react";
import { Iusers } from "../types/UserType";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/UseFetch";

interface UserDTO {
  email: string;
  password: string;
}

interface AuthContextType {
  role: string;
  user: Iusers | null;
  error: string | null;
  login: (user: UserDTO) => Promise<boolean>;
  logout: () => Promise<boolean>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { POST, VerifyToken, VerifyRefresh, data } = useFetch(
    "http://localhost:3001"
  );

  const [user, setUser] = useState<Iusers | null>(null);
  const [role, setRole] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const clearError = () => setError(null);

  const login = async (userClient: UserDTO): Promise<boolean> => {
    try {
      clearError();
      // בניית ה-URL הנכון
      let endpoint = "auth/login";

      const response = await POST(endpoint, userClient);

      if (!response || !response.foundUser) {
        console.log(444);
        console.error("Invalid response:", response);
        throw new Error("Invalid response from server");
      }
      setUser(response.foundUser);
      return true;
    } catch (error) {
      console.error("Login error details:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(`Login failed: ${errorMessage}`);
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      clearError();
      await POST("auth/logout");
      setUser(null);
      navigate("/");
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(`Logout failed: ${errorMessage}`);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ role, user, error, login, logout, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
