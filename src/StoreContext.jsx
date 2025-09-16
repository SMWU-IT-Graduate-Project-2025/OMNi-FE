import React, { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [storeName, setStoreName] = useState("SMIT");
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <StoreContext.Provider value={{ 
      storeName, 
      setStoreName, 
      selectedEvent, 
      setSelectedEvent 
    }}>
      {children}
    </StoreContext.Provider>
  );
};