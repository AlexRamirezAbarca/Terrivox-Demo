import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// Este middleware interviene en cada clic y API call que hace la plataforma
export async function middleware(request: NextRequest) {
  // Validamos el JWT con Supabase y retornamos la autorización (o redirección a login)
  return await updateSession(request)
}

// Configuración de rutas que el middleware debe escoltar
export const config = {
  matcher: [
    /*
     * Ignora el rastreo interno de archivos estáticos (imágenes, css) 
     * para ahorrar latencia a la base de datos
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
