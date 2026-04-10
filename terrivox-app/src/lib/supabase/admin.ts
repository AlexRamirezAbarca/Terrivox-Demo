import { createClient } from '@supabase/supabase-js';

// ==========================================
// SUPABASE ADMIN CLIENT (LLAVE MAESTRA SERVER-SIDE)
// ==========================================
// Esto solo debe ejecutarse en el entorno de backend de Node.js (Server Actions o API Routes)
// Al usar la Llave Maestra (SERVICE_ROLE), saltamos todas las políticas RLS y bloqueos del navegador.
// Útil específicamente para forjar usuarios, hacer triggers globales y mantenimiento de BD.

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false // Ignora la sesión activa del navegador, operando como un motor silencioso en sombra
    }
  }
);
