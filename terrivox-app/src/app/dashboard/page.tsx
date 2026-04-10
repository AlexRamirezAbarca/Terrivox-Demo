export default function MetricsDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Métricas Globales de Licencia</h1>
          <p className="text-text-muted mt-1 font-medium">Observación panóptica del rendimiento ambiental del ecosistema.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2">Medidas Ambientales Programadas</h3>
            <p className="text-5xl font-extrabold text-foreground">0</p>
         </div>
         <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-danger"></div>
            <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2">No Conformidades (Pendientes)</h3>
            <p className="text-5xl font-extrabold text-danger">0</p>
         </div>
         <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
             <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2">Agentes Base Operando</h3>
             <p className="text-5xl font-extrabold text-secondary-dark">0</p>
         </div>
      </div>
      
      <div className="bg-white p-12 rounded-3xl border border-black/5 shadow-sm text-center min-h-[300px] flex items-center justify-center">
          <div>
            <span className="text-5xl block mb-4 opacity-50">📉</span>
            <p className="text-sm text-secondary-dark font-bold bg-secondary/10 py-3 px-8 rounded-full inline-block border border-secondary/20 tracking-widest uppercase">
               🚧 Gráficos Interactivos Programados (Módulo 4)
            </p>
          </div>
      </div>
    </div>
  );
}
