'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Métricas de Licencia', href: '/dashboard/dashboard', icon: '📊' },
    { name: 'Gestión de Equipo', href: '/dashboard/equipo', icon: '👥' },
    { name: 'Planes de Manejo', href: '/dashboard/agenda', icon: '📅' },
    { name: 'Inyector de Registros', href: '/dashboard/subida', icon: '📥' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-black/5 flex flex-col hidden md:flex h-full shadow-sm">
      <div className="p-6 border-b border-black/5 flex items-center gap-3 bg-surface/30">
         <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-inner">🌱</div>
         <h2 className="text-xl font-extrabold text-primary tracking-tight">Terrivox</h2>
      </div>
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${isActive ? 'bg-primary/5 text-primary shadow-sm ring-1 ring-primary/20' : 'text-text-muted hover:bg-black/5 hover:text-foreground'}`}
            >
              <span className="text-lg opacity-80">{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-black/5 bg-background/50">
         <form action="/api/auth/signout" method="post">
           <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-danger hover:bg-danger/10 rounded-xl transition-colors">
             <span className="opacity-80">🚪</span> <span>Cerrar Autenticación</span>
           </button>
         </form>
      </div>
    </aside>
  );
}
