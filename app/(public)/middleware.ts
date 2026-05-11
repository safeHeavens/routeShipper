import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const { data: { session } } = await supabase.auth.getSession()

    // If user is trying to access /admin and has no session, redirect to login
    if (req.nextUrl.pathname.startsWith('/admin') && !session) {
        if (req.nextUrl.pathname !== '/admin/login') {
            return NextResponse.redirect(new URL('/admin/login', req.url))
        }
    }

    return res
}

export const config = {
    matcher: ['/admin/:path*'],
}