'use client';
import { useTransition, useState } from 'react';
import { registerCompany } from '@/app/actions/register';
import Link from 'next/link';

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const response = await registerCompany(formData);
      if (response?.error) {
        setErrorMsg(response.error);
      } else if (response?.success) {
        setSuccessMsg(response.message || 'Registro completado.');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-x-hidden md:py-10">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative w-full max-w-4xl glass-panel p-8 rounded-3xl animate-in zoom-in-95 fade-in duration-500 border-white/60">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-2">Crear Ecosistema Corporativo</h1>
          <p className="text-sm font-medium text-text-muted">Terrivox Fase 1 • Registro de Empresa y Supervisor</p>
        </div>

        {errorMsg && (
          <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-xl mb-6 text-sm text-center font-medium animate-in shake">
            {errorMsg}
          </div>
        )}

        {successMsg ? (
          <div className="bg-success/10 border border-success/20 text-success px-6 py-10 rounded-xl mb-6 text-center animate-in zoom-in">
             <span className="text-5xl block mb-4">📧</span>
             <h2 className="text-xl font-bold mb-2">¡Ecosistema Creado Exitosamente!</h2>
             <p className="text-sm">{successMsg}</p>
             <Link href="/login" className="mt-6 inline-block bg-success text-white px-8 py-3 rounded-xl font-bold hover:bg-success/80 transition-colors">Volver al Accesso</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Columna Izquierda: Datos Corporativos y Acceso */}
            <div className="space-y-5 bg-white/40 p-6 rounded-2xl border border-black/5">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b border-primary/10 pb-2">1. Ecosistema de Acceso</h3>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Nombre de la Empresa</label>
                <input type="text" name="companyName" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Correo de Administrador</label>
                <input type="email" name="email" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Contraseña Maestra</label>
                <input type="password" name="password" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm" required minLength={6} />
              </div>
            </div>

            {/* Columna Derecha: Datos Personales */}
            <div className="space-y-5 bg-white/40 p-6 rounded-2xl border border-black/5">
              <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4 border-b border-secondary/10 pb-2">2. Identidad del Representante</h3>
              
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Nombre</label>
                    <input type="text" name="firstName" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:ring-2 focus:ring-secondary outline-none transition-all shadow-sm" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Apellido</label>
                    <input type="text" name="lastName" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:ring-2 focus:ring-secondary outline-none transition-all shadow-sm" required />
                  </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Documento Identidad</label>
                <input type="text" name="identification" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:ring-2 focus:ring-secondary outline-none transition-all shadow-sm" required />
              </div>

              <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Edad</label>
                    <input type="number" name="age" min="18" max="100" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:ring-2 focus:ring-secondary outline-none transition-all shadow-sm" required />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Teléfono</label>
                    <input type="text" name="phone" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:ring-2 focus:ring-secondary outline-none transition-all shadow-sm" required />
                  </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Género Operativo</label>
                <select name="gender" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:ring-2 focus:ring-secondary outline-none transition-all shadow-sm" required>
                    <option value="">Selecciona tu género</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro / Prefiero no decirlo</option>
                </select>
              </div>

            </div>

            <div className="col-span-1 md:col-span-2 pt-4">
              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 disabled:opacity-70 flex justify-center items-center"
              >
                {isPending ? 'Procesando Infraestructura...' : 'Desplegar Ecosistema Seguro'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-black/5 text-center">
             <Link href="/login" className="text-sm font-semibold text-text-muted hover:text-primary transition-colors">
                ← Regresar a la pantalla de Acceso
             </Link>
        </div>
      </div>
    </div>
  );
}
