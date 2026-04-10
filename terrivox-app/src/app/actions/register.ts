'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function registerCompany(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const companyName = formData.get('companyName') as string;
  
  const identification = formData.get('identification') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const ageString = formData.get('age') as string;
  const age = ageString ? parseInt(ageString) : 0;
  const gender = formData.get('gender') as string;
  const phone = formData.get('phone') as string;

  if (!email || !password || !companyName || !firstName || !lastName || !identification || !age) {
    return { error: 'Por favor completa todos los campos.' };
  }

  // Validación de seguridad manual (Aparte del CHECK >= 18 en base de datos)
  if (age < 18) {
    return { error: 'Por motivos legales, debes ser mayor de 18 años para registrar una empresa.' };
  }

  const supabase = await createClient();

  // 1. Registramos rigurosamente en la boveda de Authentication (Supabase Auth)
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return { error: 'Error de acceso: ' + authError.message };
  }

  if (!authData.user) {
    return { error: 'Error desconocido al generar la credencial de usuario.' };
  }

  const userId = authData.user.id;

  // 2. Creamos la "Caseta" de la Empresa (El ecosistema Multi-Tenant aislado)
  const { data: companyData, error: companyError } = await supabase
    .from('companies')
    .insert([{ name: companyName }])
    .select()
    .single();

  if (companyError || !companyData) {
    return { error: 'Error de arquitectura: No se pudo modelar la nueva empresa.' };
  }

  // 3. Volcamos la información personal completa mapeada a Supabase
  const { error: profileError } = await supabase
    .from('user_profiles')
    .insert([{
      id: userId,
      company_id: companyData.id,
      email: email,
      identification: identification,
      first_name: firstName,
      last_name: lastName,
      age: age,
      gender: gender,
      phone: phone,
      role: 'admin' // Otorgamos poder supremo únicamente sobre su propia company_id
    }]);

  if (profileError) {
    return { error: 'Error al vincular el perfil personal a la junta: ' + profileError.message };
  }

  // Si Supabase tiene confirmación de correo activo, no habrá session aún
  if (!authData.session) {
    return { success: true, message: '¡Éxito! Revisa tu bandeja de correo para verificar la cuenta antes de ingresar.' };
  }

  redirect('/dashboard');
}
