
import React, { createContext, useContext, useState } from "react";
import { AuthState, User } from "@/types/auth";

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  const login = (token: string, user: User) => {
    setAuthState({ user, token, isAuthenticated: true });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthState({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
