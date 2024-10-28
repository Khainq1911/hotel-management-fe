"use client";

import { signOut } from "next-auth/react";

export default function Header() {
  return (
    <div className="flex justify-between items-center h-[60px] w-full shadow px-5">
      <p>header</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
