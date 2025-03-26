import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const rewrites = [
    { path: "/admin", destination: "http://101.96.66.218:8020" },
    { path: "/codelab", destination: "http://101.96.66.217:8015" },
    { path: "/search_api", destination: "http://101.96.66.219:8003" },
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
