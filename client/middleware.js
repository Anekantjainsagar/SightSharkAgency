// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  // Extract token from cookies
  const token = req.cookies.get("token")?.value;

  // Define the allowed paths without token
  const allowedPaths = ["/", "/reset-password"];

  // Check if the request path is allowed or if token exists
  if (!token && !allowedPaths.includes(req.nextUrl.pathname)) {
    // Redirect to the root if the token is not present and path is not allowed
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Proceed as normal if token exists or path is allowed
  return NextResponse.next();
}

// Configure the paths the middleware should run on
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
