import React, { createContext, useContext, useState } from "react";

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
  const [login, setLogin] = useState<string | null>(localStorage.getItem('currentUser'));
  const logout = () => {
    localStorage.removeItem('currentUser');
    setLogin(null);
  };

  return (
    <AuthContext.Provider value={{ login, setLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);