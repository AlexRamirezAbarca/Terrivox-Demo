import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Inicialización segura desde el Cliente/Navegador garantizando que detecte las cookies JWT
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
