'use client';
import { useTransition, useState } from 'react';
import { createEmployee } from '@/app/actions/users';

export function CreateEmployeeForm() {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    startTransition(async () => {
      const response = await createEmployee(formData);
      if (response?.error) {
        setErrorMsg(response.error);
      } else if (response?.success) {
        setSuccessMsg(response.success);
        form.reset();
      }
    });
  };

  return (
    <div className="bg-white border border-black/5 rounded-2xl shadow-sm p-6 relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
      <h3 className="font-bold text-lg mb-1">Añadir Mando Operativo</h3>
      <p className="text-xs text-text-muted mb-6">Entrega credenciales seguras a tu matriz corporativa.</p>

      {errorMsg && <div className="p-3 mb-4 rounded-xl bg-danger/10 text-danger text-xs font-bold">{errorMsg}</div>}
      {successMsg && <div className="p-3 mb-4 rounded-xl bg-success/10 border border-success/20 text-success text-xs font-bold">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">Nombre</label>
            <input type="text" name="firstName" required className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-black/10 focus:ring-2 focus:ring-primary outline-none transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">Apellido</label>
            <input type="text" name="lastName" required className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-black/10 focus:ring-2 focus:ring-primary outline-none transition-all" />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">Correo Electrónico (Login)</label>
          <input type="email" name="email" required className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-black/10 focus:ring-2 focus:ring-primary outline-none transition-all" />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">Contraseña Provisional</label>
          <input type="password" name="password" required minLength={6} className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-black/10 focus:ring-2 focus:ring-primary outline-none transition-all" />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">Jerarquía de Seguridad (Rol)</label>
          <select name="role" required className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-black/10 focus:ring-2 focus:ring-primary outline-none transition-all">
             <option value="usuario">Usuario (Asignación/Resolver Tareas)</option>
             <option value="supervisor">Supervisor (Auditor/Evaluar Matrices)</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-sm shadow-primary/30 mt-4 outline-none disabled:opacity-70"
        >
          {isPending ? 'Conectando nodos...' : '+ Forjar Credencial Silenciosa'}
        </button>
      </form>
    </div>
  );
}
