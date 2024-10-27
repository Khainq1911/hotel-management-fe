"use client";
import { AppContext } from "@/AppProvider";
import { useContext } from "react";

export default function HomePage() {
  const {sessionToken, setSessionToken} = useContext(AppContext)
  
  return (
    <div>
      <h1>this is home page</h1>
    </div>
  );
}
