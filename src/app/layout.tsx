import { AppProvider } from "@/AppProvider";
import "@/css/globals.css";
import { cookies } from "next/headers";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
    const cookieStorage = cookies()
    const sessionStorage = cookieStorage.get("accessToken")
   
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <AppProvider inititalSessionToken={sessionStorage?.value}>
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
