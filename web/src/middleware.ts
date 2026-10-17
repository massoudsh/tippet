import { NextRequest, NextResponse } from "next/server";

const mutationMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  if (request.nextUrl.pathname.startsWith("/api/") && mutationMethods.has(request.method)) {
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const expectedOrigin = request.nextUrl.origin;
    const sameOrigin = origin === expectedOrigin || (!origin && referer?.startsWith(`${expectedOrigin}/`));

    if (!sameOrigin) {
      return NextResponse.json({ error: "درخواست از مبدأ نامعتبر رد شد." }, { status: 403 });
    }
  }

  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
