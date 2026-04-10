'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

// ==========================================
// CONTROLLER (Server Action) - Patrón de Responsabilidad Única (SRP)
// Este archivo vive 100% en el backend y NUNCA se envía al navegador del usuario.
// Maneja únicamente la seguridad y la transacción con la Base de Datos.
// ==========================================

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) {
    return { error: 'Por favor completa todos los campos' };
  }

  // Instanciamos el SDK SSR de forma segura en el servidor
  const supabase = await createClient();

  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    if (authError.message === 'Invalid login credentials') {
      return { error: 'Credenciales Inválidas para Terrivox.' };
    }
    if (authError.message === 'Email not confirmed') {
      return { error: 'Por seguridad, debes confirmar tu cuenta haciendo clic en el enlace que enviamos a tu correo electrónico.' };
    }
    return { error: authError.message };
  }

  // Redirect interrumpe la ejecución con una señal HTTP de redirección para Next.js
  redirect('/dashboard');
}
