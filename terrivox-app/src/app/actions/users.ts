'use server';

import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function createEmployee(formData: FormData) {
  // Instanciamos el SDK público para leer quién está llamando la función usando las cookies del navegador
  const adminSupabase = await createClient(); 
  
  // 1. Verificar identidad del administrador en tiempo real
  const { data: userData, error: userError } = await adminSupabase.auth.getUser();
  if (userError || !userData.user) return { error: 'No autorizado. Tu sesión expiró.' };

  const { data: currentProfile } = await adminSupabase
    .from('user_profiles')
    .select('company_id, role')
    .eq('id', userData.user.id)
    .single();

  // Escudo lógico ético: Solo un Jefe (Admin/Supervisor) puede inyectar usuarios a su empresa
  if (!currentProfile || (currentProfile.role !== 'admin' && currentProfile.role !== 'supervisor')) {
    return { error: 'No tienes jerarquía técnica para inyectar personal.' };
  }

  const companyId = currentProfile.company_id;

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const role = formData.get('role') as string;

  if (!email || !password || !firstName || !lastName || !role) {
    return { error: 'La credencial requiere todos los campos técnicos.' };
  }

  // 2. Crear al empleado SILENCIOSAMENTE usando la LLave Maestra.
  // Esto evita enviar un Token Nuevo al navegador que cerraría la sesión activa del Jefe accidentalmente.
  const { data: newAuthUser, error: newAuthError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true // Como el Jefe avala la existencia del empleado, podemos saltar el correo obligatorio de confirmación temporalmente
  });

  if (newAuthError) {
    return { error: 'Error del Motor Criptográfico: ' + newAuthError.message };
  }

  if (!newAuthUser.user) return { error: 'Error desconocido del motor Auth.' };

  // 3. Vincular al empleado a la Misma Caseta (company_id) del Jefe
  const { error: profileError } = await supabaseAdmin
    .from('user_profiles')
    .insert([{
      id: newAuthUser.user.id,
      company_id: companyId,
      email: email,
      first_name: firstName,
      last_name: lastName,
      role: role
    }]);

  if (profileError) {
    return { error: 'Error al vincular a tu ecosistema corporativo: ' + profileError.message };
  }

  // Refresca la caché de Next.js enviando la orden de repintar la tabla de personal
  revalidatePath('/dashboard/equipo');
  return { success: `El empleado ${firstName} fue aprovisionado exitosamente en tu Empresa.` };
}
