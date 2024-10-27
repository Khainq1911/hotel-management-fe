import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
  }
  return NextResponse.next()
}
export const config = {
  matcher: ["/", "/home"],
};
