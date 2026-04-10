import { createClient } from '@supabase/supabase-js';

// Validamos que existan las variables de entorno para evitar crasheos silenciosos en producción
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las credenciales de Supabase en el archivo .env');
}

// Inicialización del cliente maestro (Singleton) de Supabase para toda nuestra plataforma Terrivox
export const supabase = createClient(supabaseUrl, supabaseKey);
