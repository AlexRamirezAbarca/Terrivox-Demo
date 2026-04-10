export default function AgendaPage() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Matriz de Cumplimientos</h1>
          <p className="text-text-muted mt-1 font-medium">Asignación, frecuencia y control de tareas operativas derivadas del Plan de Manejo.</p>
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-3xl shadow-sm overflow-hidden min-h-[500px] flex items-center justify-center">
          <div className="text-center p-10">
             <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                 <span className="text-5xl">📅</span>
             </div>
             <h2 className="text-2xl font-bold mb-3 text-foreground">Agenda Operativa Vacia</h2>
             <p className="text-text-muted max-w-sm mx-auto mb-8 font-medium">Las tareas automatizadas aparecerán aquí una vez el motor de Excel haya inyectado el Plan de Manejo Anual.</p>
             <p className="text-sm text-secondary-dark font-bold bg-secondary/10 py-2 px-6 rounded-full inline-flex border border-secondary/20">
                🚧 Módulo 3 (Agenda Predictiva) en Construcción
             </p>
          </div>
      </div>
    </div>
  );
}
