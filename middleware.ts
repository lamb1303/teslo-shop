import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const validRoles = ['admin', 'super-user', 'SEO'];
    const url = req.nextUrl.clone();

    if (req.nextUrl.pathname.startsWith('/api/admin')) {

        if (!validRoles.includes(session.user.role)) {
            return NextResponse.json({ message: 'Auth required' }, { status: 401 })
        }
    }

    if (!session) {

        // Obtenemos la pagina que esta siendo solicitada
        const requestedPage = req.nextUrl.pathname;

        // Mandamos el usuario a loguearse
        url.pathname = `/auth/login`;

        // Al autenticarse seguira a donde iba
        url.search = `p=${requestedPage}`;

        return NextResponse.redirect(url);

    }

    if (!validRoles.includes(session.user.role)) {
        url.pathname = '/'

        return NextResponse.redirect(url);

    }

    return NextResponse.next();

}

export const config = {
    matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*']
}