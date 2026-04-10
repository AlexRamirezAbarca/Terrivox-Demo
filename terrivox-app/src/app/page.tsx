import { redirect } from 'next/navigation';

export default function RootIndexPage() {
  // En un ERP privado, la raíz del sitio no es una página pública (Landing),
  // enviamos directamente al portal de Módulos (Login) para que el Middleware decida.
  redirect('/login');
}
