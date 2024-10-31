"use client";

import { useSession } from "next-auth/react";

export const isEmployee = (): boolean => {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  if (!accessToken) {
    return false; 
  }

  try {
    const payload = JSON.parse(
      atob(accessToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );

    return payload.is_admin;
  } catch (error) {
    return false;
  }
};
