import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const values = await request.json();
    const res = await fetch("http://localhost:1912/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    const cookieStore = await cookies();
    cookieStore.set({
      name: "accessToken",
      value: data.accessToken,
      httpOnly: true,
      path: "/",
    });
    
    
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Login failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
