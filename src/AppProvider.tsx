"use client";
import { useState } from "react";
import { createContext } from "react";

const AppContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken: string) => {},
});

const AppProvider = ({
  children,
  inititalSessionToken = "",
}: {
  children: React.ReactNode;
  inititalSessionToken?: string;
}) => {
  const [sessionToken, setSessionToken] = useState(inititalSessionToken);
  return (
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
