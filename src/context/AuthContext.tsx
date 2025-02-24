import React, { createContext, useContext, useState } from "react";
import { CURRENT_USER_STORAGE_KEY } from "../modules/consts";

const AuthContext = createContext<{ 
  login: string | null; 
  setLogin: (login: string) => void; 
  logout: () => void;
}>({
  login: null,
  setLogin: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [login, setLogin] = useState<string | null>(localStorage.getItem(CURRENT_USER_STORAGE_KEY));
  const logout = () => {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    setLogin(null);
  };

  return (
    <AuthContext.Provider value={{ login, setLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);