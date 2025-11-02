import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Simulate login for now
    return new Promise((resolve) => {
      setUser({ name: "Varad", email }); // Replace with actual backend call
      localStorage.setItem("userEmail", email);
      resolve();
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve) => {
      setUser({ name, email });
      localStorage.setItem("userEmail", email);
      resolve();
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userEmail");
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};