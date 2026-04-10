import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Instanciamos el cliente asincrónico para limpiar las cookies de JWT almacenadas
  const supabase = await createClient();
  
  // Deshabilitar la sesión en la bóveda
  await supabase.auth.signOut();

  // Redirigir explícitamente a la pantalla de Login usando el código HTTP 302/303
  return NextResponse.redirect(new URL('/login', request.url), {
    status: 302,
  });
}
