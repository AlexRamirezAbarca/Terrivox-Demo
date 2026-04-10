export default function SubidaExcelPage() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Motor de Ingesta Excel</h1>
          <p className="text-text-muted mt-1 font-medium">Sube de forma masiva los Planes de Manejo y Tareas Operativas mediante tu plantilla.</p>
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl shadow-sm p-10 flex-1 flex flex-col items-center justify-center text-center mt-6">
         <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20 shadow-inner">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
         </div>
         <h2 className="text-2xl font-bold mb-3">Arrastra tu Archivo Maestro (XLSX)</h2>
         <p className="text-text-muted mb-8 max-w-md mx-auto leading-relaxed">Nuestro motor inteligente procesará las múltiples hojas de cálculo, estructurará las frecuencias y nutrirá la base de datos automáticamente en segundos.</p>
         
         <label className="bg-primary hover:bg-primary-dark cursor-pointer text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-primary/30 max-w-xs mx-auto w-full inline-flex items-center justify-center gap-2">
             <span>Examinar Equipo...</span>
             <input type="file" className="hidden" accept=".xlsx, .xls" />
         </label>
         
         <div className="mt-12 pt-6 border-t border-black/5 w-full max-w-md mx-auto">
             <p className="text-xs text-text-muted font-bold tracking-widest uppercase">Estatus de Ingeniería</p>
             <p className="text-sm text-secondary-dark mt-2 font-bold bg-secondary/10 py-2 px-6 rounded-full inline-flex border border-secondary/20">
                🚧 Módulo 2 Programado (En Construcción)
             </p>
         </div>
      </div>
    </div>
  );
}
