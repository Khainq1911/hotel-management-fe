import { SessionProvider } from "next-auth/react";
import Header from "@/components/header";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <Header />
          <div className="pt-[60px]">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
