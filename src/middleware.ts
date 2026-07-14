import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // console.log("middleware: token", token);

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Jika user sudah login, lanjutkan request
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
