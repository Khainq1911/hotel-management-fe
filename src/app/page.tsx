import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";

export default function Page() {
  return (
    <div>
      <SessionProvider>
        <Header />
      </SessionProvider>
    </div>
  );
}
