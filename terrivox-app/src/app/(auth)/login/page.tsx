'use client';
import { useTransition, useState } from 'react';
import { loginUser } from '@/app/actions/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const response = await loginUser(formData);
      if (response?.error) {
        setErrorMsg(response.error);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Light Warm Decors */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/15 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative w-full max-w-md glass-panel p-10 rounded-3xl animate-in zoom-in-95 fade-in duration-500 border-white/60">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white mb-4 border border-black/5 shadow-sm text-primary">
             <span className="text-3xl">🌱</span>
          </div>
          <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">Terrivox</h1>
          <p className="text-sm font-medium text-text-muted uppercase tracking-widest">Portal de Acceso</p>
        </div>

        {errorMsg && (
          <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-xl mb-6 text-sm text-center font-medium animate-in shake">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Correo Corporativo</label>
            <input 
              type="email" 
              name="email"
              className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
              placeholder="admin@empresa.com"
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
               <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Contraseña</label>
               <span className="text-xs text-primary hover:underline cursor-pointer font-medium">Olvidé mi clave</span>
            </div>
            <input 
              type="password" 
              name="password"
              className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 disabled:opacity-70 flex justify-center items-center mt-2"
          >
             {isPending ? 'Iniciando sesión...' : 'Ingresar al ERP'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-black/5 text-center">
             <p className="text-sm text-text-muted font-medium mb-3">¿Tu empresa es nueva en Terrivox?</p>
             <Link href="/register" className="inline-block px-6 py-2 border-2 border-primary text-primary hover:bg-primary/5 rounded-full text-sm font-bold transition-colors">
                Registrar Mi Empresa
             </Link>
        </div>
      </div>
    </div>
  );
}
