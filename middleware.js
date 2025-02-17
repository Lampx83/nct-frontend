import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const rewrites = [
    { path: "/admin", destination: "http://101.96.66.219:8015" },
    { path: "/oj", destination: "http://203.113.132.48:8016" },
    { path: "/codelab", destination: "http://101.96.66.217:8015" },
    { path: "/search_api", destination: "http://101.96.66.219:8003" },
    { path: "/scoreup", destination: "https://scoreup-frontend.vercel.app/" },
    { path: "/neu-oj", destination: "https://neu-oj-frontend.vercel.app/neu-oj" },
  ];

  for (const { path, destination } of rewrites) {
    if (url.pathname.startsWith(path)) {
      return NextResponse.rewrite(
        `${destination}${url.pathname.replace(path, "")}${url.search}`
      );
    }
  }

  return NextResponse.next();
}
