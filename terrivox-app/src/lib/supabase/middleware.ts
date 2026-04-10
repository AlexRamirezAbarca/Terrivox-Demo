import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Inicializa la respuesta que dejaremos pasar si todo es válido
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Instancia de verificación de JWT vía Cookies Oficiales de Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresca activamente el token para que no venza si el usuario navega
  const { data: { user } } = await supabase.auth.getUser()

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')
  
  // Regla 1: Si NO está autenticado y trata de entrar al sistema, tíralo al login
  if (!user && !isAuthRoute && !request.nextUrl.pathname.startsWith('/api/public')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Regla 2: Si ESTÁ logueado y trata de ver el Login page, rebótalo adentro (UX)
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // TODO: A futuro aquí añadiremos el fetch de `user_profiles` para leer el rol
  // Y prevenir que un "usuario" entre a la vista de "admin"

  return supabaseResponse
}
