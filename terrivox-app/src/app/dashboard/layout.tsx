import { Sidebar } from '@/components/layout/Sidebar';

// DashboardLayout maneja explícitamente aquellas rutas que deben estar "dentro" del ERP.
// Solo hereda su estructura a los "hijos" (subida, agenda, dashboard), aislando totalmente el `/login`.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
