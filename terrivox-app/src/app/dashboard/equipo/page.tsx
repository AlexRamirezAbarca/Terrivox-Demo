import { createClient } from '@/lib/supabase/server';
import { CreateEmployeeForm } from './CreateEmployeeForm';

export default async function EquipoPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) return null;

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('company_id')
    .eq('id', userData.user.id)
    .single();

  if (!profile) {
    return (
      <div className="p-10 text-center mt-20 bg-white rounded-3xl border border-black/5 shadow-sm max-w-2xl mx-auto">
        <span className="text-5xl block mb-4">⚠️</span>
        <h2 className="text-2xl font-bold text-danger mb-4">Perfil de Empresa No Encontrado</h2>
        <p className="text-text-muted mb-6">Has iniciado sesión con un correo antiguo de prueba que no está atado a ninguna Empresa (company_id). El módulo de Reclutamiento requiere un ecosistema corporativo privado para aislar los datos.</p>
        <p className="font-bold text-primary p-4 bg-primary/10 rounded-xl">Solución: Cierra sesión y usa explícitamente el botón "Registrar Nueva Empresa" en la pantalla de inicio para nacer como Jefe.</p>
      </div>
    );
  }

  // Escaneo del Ecosistema: Extraer única y exclusivamente usuarios mapeados a LA MISMA EMPRESA (Multi-tenant)
  const { data: teamMembers } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('company_id', profile.company_id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Gestión de Equipo Central</h1>
          <p className="text-text-muted mt-1 font-medium">Observación panóptica de infraestructura y permisos corporativos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Lateral para Reclutamiento/Creación */}
        <div className="lg:col-span-1">
           <CreateEmployeeForm />
        </div>
        
        {/* Grid Principal de Empleados Existentes */}
        <div className="lg:col-span-2">
           <div className="bg-white border border-black/5 rounded-2xl shadow-sm overflow-hidden h-full">
             <div className="p-5 border-b border-black/5 bg-surface/50">
               <h3 className="font-bold text-lg">Personal Activo del Ecosistema</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm text-text-muted">
                 <thead className="bg-black/5 text-xs uppercase font-bold text-foreground">
                   <tr>
                     <th className="px-6 py-4">Agente</th>
                     <th className="px-6 py-4">Restricción / Rol</th>
                     <th className="px-6 py-4">Alta Digital</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-black/5">
                   {teamMembers?.map((m) => (
                     <tr key={m.id} className="hover:bg-black/[0.02] transition-colors">
                       <td className="px-6 py-4">
                         <div className="font-bold text-foreground">{m.first_name || 'Agente'} {m.last_name || 'Reservado'}</div>
                         <div className="text-xs">{m.email}</div>
                         <div className="text-[10px] text-primary/70">{m.identification}</div>
                       </td>
                       <td className="px-6 py-4">
                         <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${m.role === 'admin' ? 'bg-danger/10 text-danger' : m.role === 'supervisor' ? 'bg-secondary/10 text-secondary-dark' : 'bg-primary/10 text-primary-dark'}`}>
                           {m.role}
                         </span>
                       </td>
                       <td className="px-6 py-4">
                          <span className="text-xs font-mono opacity-50">{new Date(m.created_at).toLocaleDateString()}</span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
               {(!teamMembers || teamMembers.length === 0) && (
                 <div className="p-10 text-center bg-background/50">
                   <p className="text-text-muted font-bold text-lg">Ecosistema en Blanco</p>
                   <p className="text-sm">Agrega tu primer personal desde el panel izquierdo.</p>
                 </div>
               )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
