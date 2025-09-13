import React, { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [storeName, setStoreName] = useState("SMIT");

  return (
    <StoreContext.Provider value={{ storeName, setStoreName }}>
      {children}
    </StoreContext.Provider>
  );
};