/* ============================
   TERRIVOX — Main Application
   ============================ */
import './style.css';

// ---- Mock Data ----
const MOCK = {
  licencias: [
    { id: 'LIC-001', nombre: 'Licencia Ambiental Operativa', empresa: 'AcuaShrimp S.A.', tipo: 'Licencia Ambiental', estado: 'vigente', fechaEmision: '2025-03-15', fechaVence: '2026-03-15', entidad: 'MAATE' },
    { id: 'LIC-002', nombre: 'Permiso de Descarga de Efluentes', empresa: 'AcuaShrimp S.A.', tipo: 'Permiso', estado: 'por_vencer', fechaEmision: '2024-06-10', fechaVence: '2026-04-10', entidad: 'SENAGUA' },
    { id: 'LIC-003', nombre: 'Registro de Generador de Desechos', empresa: 'AcuaShrimp S.A.', tipo: 'Registro', estado: 'vigente', fechaEmision: '2025-01-20', fechaVence: '2027-01-20', entidad: 'MAATE' },
    { id: 'LIC-004', nombre: 'Certificado de Intersección', empresa: 'AcuaShrimp S.A.', tipo: 'Certificado', estado: 'vigente', fechaEmision: '2025-05-01', fechaVence: '2026-05-01', entidad: 'MAATE' },
    { id: 'LIC-005', nombre: 'Licencia de Aprovechamiento Forestal', empresa: 'AcuaShrimp S.A.', tipo: 'Licencia', estado: 'vencida', fechaEmision: '2023-11-10', fechaVence: '2025-11-10', entidad: 'MAATE' },
    { id: 'LIC-006', nombre: 'Permiso de Uso de Agua', empresa: 'AcuaShrimp S.A.', tipo: 'Permiso', estado: 'vigente', fechaEmision: '2025-08-01', fechaVence: '2027-08-01', entidad: 'SENAGUA' },
    { id: 'LIC-007', nombre: 'Plan de Manejo Ambiental', empresa: 'AcuaShrimp S.A.', tipo: 'Plan', estado: 'por_vencer', fechaEmision: '2024-09-01', fechaVence: '2026-03-30', entidad: 'MAATE' },
  ],
  residuos: [
    { id: 'RES-001', tipo: 'Peligroso', nombre: 'Aceites usados', cantidad: '240 kg', gestor: 'EcoGestor CIA.', fecha: '2026-02-15', estado: 'retirado' },
    { id: 'RES-002', tipo: 'No Peligroso', nombre: 'Cartón y papel', cantidad: '520 kg', gestor: 'ReciclaPro S.A.', fecha: '2026-02-20', estado: 'retirado' },
    { id: 'RES-003', tipo: 'Peligroso', nombre: 'Baterías de plomo', cantidad: '85 kg', gestor: 'HazWaste EC', fecha: '2026-03-01', estado: 'pendiente' },
    { id: 'RES-004', tipo: 'Especial', nombre: 'Lodos de tratamiento', cantidad: '1,200 kg', gestor: 'BioTreat S.A.', fecha: '2026-03-05', estado: 'en_proceso' },
    { id: 'RES-005', tipo: 'No Peligroso', nombre: 'Plástico reciclable', cantidad: '340 kg', gestor: 'ReciclaPro S.A.', fecha: '2026-03-08', estado: 'pendiente' },
    { id: 'RES-006', tipo: 'Peligroso', nombre: 'Envases contaminados', cantidad: '67 kg', gestor: 'EcoGestor CIA.', fecha: '2026-03-10', estado: 'pendiente' },
  ],
  alertas: [
    { id: 1, tipo: 'high', titulo: 'Licencia Forestal vencida', desc: 'La Licencia de Aprovechamiento Forestal (LIC-005) venció el 10/11/2025. Se requiere renovación inmediata para evitar sanciones del MAATE.', fecha: 'Hace 2 horas', categoria: 'Licencias' },
    { id: 2, tipo: 'high', titulo: 'Límite de emisiones excedido', desc: 'Los niveles de DBO5 en el efluente de la Piscina 3 superan el límite permitido (250 mg/L vs 100 mg/L máximo según TULSMA).', fecha: 'Hace 5 horas', categoria: 'Monitoreo' },
    { id: 3, tipo: 'medium', titulo: 'Permiso de Descarga por vencer', desc: 'El Permiso de Descarga de Efluentes (LIC-002) vence el 10/04/2026. Iniciar trámite de renovación ante SENAGUA.', fecha: 'Hace 1 día', categoria: 'Licencias' },
    { id: 4, tipo: 'medium', titulo: 'Plan de Manejo Ambiental por vencer', desc: 'El PMA (LIC-007) vence el 30/03/2026. Se requiere actualización y presentación al MAATE.', fecha: 'Hace 1 día', categoria: 'Licencias' },
    { id: 5, tipo: 'low', titulo: 'Residuos peligrosos pendientes de retiro', desc: '3 registros de residuos peligrosos pendientes de retiro por gestores autorizados. Verificar agenda de recolección.', fecha: 'Hace 2 días', categoria: 'Residuos' },
    { id: 6, tipo: 'low', titulo: 'Auditoría interna programada', desc: 'Auditoría ambiental interna programada para el 20/03/2026. Preparar documentación de cumplimiento.', fecha: 'Hace 3 días', categoria: 'Auditorías' },
  ],
  monitoreo: {
    agua: { valor: 6.8, unidad: 'pH', estado: 'Normal', color: 'green' },
    dbo: { valor: 95, unidad: 'mg/L', max: 100, estado: 'Límite', color: 'yellow' },
    ruido: { valor: 62, unidad: 'dB', max: 70, estado: 'Normal', color: 'green' },
    emisiones: { valor: 180, unidad: 'mg/m³', max: 200, estado: 'Precaución', color: 'yellow' },
  },
  chartData: [
    { label: 'Sep', value: 65 },
    { label: 'Oct', value: 78 },
    { label: 'Nov', value: 52 },
    { label: 'Dic', value: 89 },
    { label: 'Ene', value: 72 },
    { label: 'Feb', value: 95 },
    { label: 'Mar', value: 60 },
  ],
};

// ---- State ----
let currentView = 'dashboard';

// ---- DOM Refs ----
const loginScreen = document.getElementById('login-screen');
const loginForm = document.getElementById('login-form');
const appShell = document.getElementById('app-shell');
const contentArea = document.getElementById('content-area');
const pageTitle = document.getElementById('page-title');
const navItems = document.querySelectorAll('.nav-item');
const logoutBtn = document.getElementById('logout-btn');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

// ---- View Titles ----
const VIEW_TITLES = {
  dashboard: 'Dashboard',
  licencias: 'Gestión de Licencias',
  residuos: 'Gestión de Residuos',
  monitoreo: 'Monitoreo Ambiental',
  alertas: 'Alertas y Notificaciones',
  reportes: 'Reportes',
};

// ---- Login ----
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  btn.innerHTML = '<span>Ingresando...</span>';
  btn.style.pointerEvents = 'none';
  
  setTimeout(() => {
    loginScreen.classList.add('hidden');
    appShell.classList.remove('hidden');
    renderView('dashboard');
    showToast('Bienvenido/a a Terrivox');
  }, 800);
});

// ---- Logout ----
logoutBtn.addEventListener('click', () => {
  appShell.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  const btn = document.getElementById('login-btn');
  btn.innerHTML = '<span>Iniciar Sesión</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  btn.style.pointerEvents = '';
});

// ---- Navigation ----
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const view = item.dataset.view;
    if (view === currentView) return;
    navItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    renderView(view);
    // Close mobile sidebar
    sidebar.classList.remove('open');
  });
});

// ---- Mobile Menu ----
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// ---- Toast ----
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span class="toast-message">${message}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ---- Render View ----
function renderView(viewName) {
  currentView = viewName;
  pageTitle.textContent = VIEW_TITLES[viewName] || viewName;
  
  const renderers = {
    dashboard: renderDashboard,
    licencias: renderLicencias,
    residuos: renderResiduos,
    monitoreo: renderMonitoreo,
    alertas: renderAlertas,
    reportes: renderReportes,
  };

  const renderer = renderers[viewName];
  if (renderer) {
    contentArea.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'view-enter';
    wrapper.innerHTML = renderer();
    contentArea.appendChild(wrapper);

    // Initialize interactive elements after render
    if (viewName === 'licencias') initLicenciasFilters();
    if (viewName === 'alertas') initAlertasFilters();
    if (viewName === 'reportes') initReportButtons();
  }
}

// ---- Status helpers ----
function getEstadoBadge(estado) {
  const map = {
    vigente: { cls: 'success', text: 'Vigente' },
    por_vencer: { cls: 'warning', text: 'Por vencer' },
    vencida: { cls: 'danger', text: 'Vencida' },
    retirado: { cls: 'success', text: 'Retirado' },
    pendiente: { cls: 'warning', text: 'Pendiente' },
    en_proceso: { cls: 'info', text: 'En proceso' },
  };
  const info = map[estado] || { cls: 'info', text: estado };
  return `<span class="badge ${info.cls}"><span class="badge-dot"></span>${info.text}</span>`;
}

function getTipoBadge(tipo) {
  const map = {
    'Peligroso': 'danger',
    'No Peligroso': 'success',
    'Especial': 'warning',
  };
  return `<span class="badge ${map[tipo] || 'info'}">${tipo}</span>`;
}

// ============================
// DASHBOARD
// ============================
function renderDashboard() {
  const vigentes = MOCK.licencias.filter(l => l.estado === 'vigente').length;
  const porVencer = MOCK.licencias.filter(l => l.estado === 'por_vencer').length;
  const alertasAltas = MOCK.alertas.filter(a => a.tipo === 'high').length;
  const residuosMes = MOCK.residuos.reduce((sum, r) => sum + parseInt(r.cantidad.replace(/[^\d]/g, '')), 0);

  return `
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-header">
          <div class="kpi-icon green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>
          </div>
          <span class="kpi-trend up">↑ 12%</span>
        </div>
        <div class="kpi-value">${vigentes}</div>
        <div class="kpi-label">Licencias Vigentes</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-header">
          <div class="kpi-icon yellow">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <span class="kpi-trend neutral">→ ${porVencer}</span>
        </div>
        <div class="kpi-value">${porVencer}</div>
        <div class="kpi-label">Por Vencer (30 días)</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-header">
          <div class="kpi-icon red">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <span class="kpi-trend down">↑ ${alertasAltas}</span>
        </div>
        <div class="kpi-value">${alertasAltas}</div>
        <div class="kpi-label">Alertas Críticas</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-header">
          <div class="kpi-icon blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </div>
          <span class="kpi-trend up">↑ 8%</span>
        </div>
        <div class="kpi-value">${(residuosMes / 1000).toFixed(1)}t</div>
        <div class="kpi-label">Residuos Gestionados</div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Cumplimiento Ambiental — Últimos 7 meses</h3>
          <button class="btn btn-sm btn-secondary">Ver todo</button>
        </div>
        <div class="card-body">
          <div class="chart-placeholder">
            ${MOCK.chartData.map(d => `<div class="chart-bar" style="height: ${d.value}%" data-label="${d.label}"></div>`).join('')}
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Actividad Reciente</h3>
        </div>
        <div class="card-body">
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-dot green"></div>
              <div class="activity-text">
                <p>Se renovó la <strong>Licencia Ambiental Operativa</strong></p>
                <span>Hace 2 horas</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot red"></div>
              <div class="activity-text">
                <p>Alerta: Niveles de <strong>DBO5</strong> por encima del límite</p>
                <span>Hace 5 horas</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot yellow"></div>
              <div class="activity-text">
                <p><strong>Permiso de Descarga</strong> vence en 30 días</p>
                <span>Hace 1 día</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot blue"></div>
              <div class="activity-text">
                <p>Retiro de <strong>520 kg</strong> de cartón completado</p>
                <span>Hace 2 días</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot green"></div>
              <div class="activity-text">
                <p>Reporte mensual de <strong>monitoreo</strong> generado</p>
                <span>Hace 3 días</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================
// LICENCIAS
// ============================
function renderLicencias() {
  return `
    <div class="table-controls">
      <div class="table-filters" id="licencias-filters">
        <button class="filter-btn active" data-filter="all">Todas</button>
        <button class="filter-btn" data-filter="vigente">Vigentes</button>
        <button class="filter-btn" data-filter="por_vencer">Por vencer</button>
        <button class="filter-btn" data-filter="vencida">Vencidas</button>
      </div>
      <button class="btn btn-primary btn-sm">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Nueva Licencia
      </button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="data-table" id="licencias-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Entidad</th>
              <th>Emisión</th>
              <th>Vencimiento</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${MOCK.licencias.map(l => `
              <tr data-estado="${l.estado}">
                <td style="color: var(--text-tertiary); font-family: monospace; font-size: 0.82rem;">${l.id}</td>
                <td><strong>${l.nombre}</strong></td>
                <td>${l.tipo}</td>
                <td>${l.entidad}</td>
                <td>${formatDate(l.fechaEmision)}</td>
                <td>${formatDate(l.fechaVence)}</td>
                <td>${getEstadoBadge(l.estado)}</td>
                <td>
                  <button class="btn-icon" title="Ver detalle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function initLicenciasFilters() {
  const filters = document.querySelectorAll('#licencias-filters .filter-btn');
  const table = document.getElementById('licencias-table');
  if (!table) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        if (filter === 'all' || row.dataset.estado === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

// ============================
// RESIDUOS
// ============================
function renderResiduos() {
  const peligrosos = MOCK.residuos.filter(r => r.tipo === 'Peligroso').length;
  const noPeligrosos = MOCK.residuos.filter(r => r.tipo === 'No Peligroso').length;
  const especiales = MOCK.residuos.filter(r => r.tipo === 'Especial').length;
  const total = MOCK.residuos.length;

  const pPct = Math.round((peligrosos / total) * 100);
  const npPct = Math.round((noPeligrosos / total) * 100);
  const ePct = 100 - pPct - npPct;

  // Donut chart segments
  const seg1 = pPct * 2.51;
  const seg2 = npPct * 2.51;
  const seg3 = ePct * 2.51;
  const gap = 8;

  return `
    <div class="dashboard-grid" style="margin-bottom: 24px;">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Distribución por Tipo</h3>
        </div>
        <div class="card-body">
          <div class="donut-container">
            <svg class="donut-svg" width="140" height="140" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg-tertiary)" stroke-width="12"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--danger)" stroke-width="12"
                stroke-dasharray="${seg1} ${251.2 - seg1}" stroke-dashoffset="0"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--success)" stroke-width="12"
                stroke-dasharray="${seg2} ${251.2 - seg2}" stroke-dashoffset="-${seg1 + gap}"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--warning)" stroke-width="12"
                stroke-dasharray="${seg3} ${251.2 - seg3}" stroke-dashoffset="-${seg1 + seg2 + gap * 2}"/>
            </svg>
            <div class="donut-legend">
              <div class="legend-item"><div class="legend-color" style="background: var(--danger)"></div>Peligrosos (${peligrosos})</div>
              <div class="legend-item"><div class="legend-color" style="background: var(--success)"></div>No Peligrosos (${noPeligrosos})</div>
              <div class="legend-item"><div class="legend-color" style="background: var(--warning)"></div>Especiales (${especiales})</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Resumen del Mes</h3>
        </div>
        <div class="card-body">
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-dot red"></div>
              <div class="activity-text">
                <p><strong>${peligrosos}</strong> registros de residuos peligrosos</p>
                <span>392 kg totales</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot green"></div>
              <div class="activity-text">
                <p><strong>${noPeligrosos}</strong> registros de residuos no peligrosos</p>
                <span>860 kg totales</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot yellow"></div>
              <div class="activity-text">
                <p><strong>${especiales}</strong> registros de residuos especiales</p>
                <span>1,200 kg totales</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot blue"></div>
              <div class="activity-text">
                <p><strong>3</strong> gestores autorizados activos</p>
                <span>Todos con permisos vigentes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-header">
      <div>
        <h3 class="section-title">Registros de Residuos</h3>
        <p class="section-subtitle">Historial de generación y gestión de residuos</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Nuevo Registro
      </button>
    </div>

    <div class="card">
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Gestor Autorizado</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${MOCK.residuos.map(r => `
              <tr>
                <td style="color: var(--text-tertiary); font-family: monospace; font-size: 0.82rem;">${r.id}</td>
                <td>${getTipoBadge(r.tipo)}</td>
                <td>${r.nombre}</td>
                <td><strong>${r.cantidad}</strong></td>
                <td>${r.gestor}</td>
                <td>${formatDate(r.fecha)}</td>
                <td>${getEstadoBadge(r.estado)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ============================
// MONITOREO
// ============================
function renderMonitoreo() {
  const params = [
    { key: 'pH del Agua', ...MOCK.monitoreo.agua, icon: '💧' },
    { key: 'DBO5 Efluente', ...MOCK.monitoreo.dbo, icon: '🧪' },
    { key: 'Ruido Ambiental', ...MOCK.monitoreo.ruido, icon: '🔊' },
    { key: 'Emisiones PM2.5', ...MOCK.monitoreo.emisiones, icon: '🌫️' },
  ];

  return `
    <div class="monitoring-grid">
      ${params.map(p => {
        const pct = p.max ? Math.round((p.valor / p.max) * 100) : null;
        const statusClass = p.color === 'green' ? 'success' : p.color === 'yellow' ? 'warning' : 'danger';
        return `
          <div class="gauge-card">
            <div class="gauge-visual">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg-tertiary)" stroke-width="10"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--${statusClass})" stroke-width="10"
                  stroke-dasharray="${pct ? (pct * 3.14) : 213} 314"
                  stroke-linecap="round" transform="rotate(-90 60 60)"
                  style="transition: stroke-dasharray 1s ease;"/>
              </svg>
              <div>
                <div class="gauge-value">${p.valor}</div>
                <div class="gauge-unit">${p.unidad}</div>
              </div>
            </div>
            <div class="gauge-label">${p.icon} ${p.key}</div>
            <span class="badge ${statusClass}" style="margin-top: 8px;">${p.estado}${p.max ? ` (máx: ${p.max})` : ''}</span>
          </div>
        `;
      }).join('')}
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Historial de Monitoreo</h3>
        <button class="btn btn-sm btn-secondary">Exportar datos</button>
      </div>
      <div class="card-body">
        <div class="chart-placeholder" style="height: 180px;">
          ${[45, 62, 75, 58, 82, 90, 95, 88, 72, 68, 55, 60].map((v, i) => `
            <div class="chart-bar" style="height: ${v}%; background: linear-gradient(180deg, ${v > 80 ? 'var(--warning)' : 'var(--primary-400)'}, ${v > 80 ? 'var(--danger)' : 'var(--primary-700)'});" data-label="${['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}"></div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ============================
// ALERTAS
// ============================
function renderAlertas() {
  return `
    <div class="table-controls">
      <div class="table-filters" id="alertas-filters">
        <button class="filter-btn active" data-filter="all">Todas (${MOCK.alertas.length})</button>
        <button class="filter-btn" data-filter="high">Críticas (${MOCK.alertas.filter(a => a.tipo === 'high').length})</button>
        <button class="filter-btn" data-filter="medium">Media (${MOCK.alertas.filter(a => a.tipo === 'medium').length})</button>
        <button class="filter-btn" data-filter="low">Baja (${MOCK.alertas.filter(a => a.tipo === 'low').length})</button>
      </div>
    </div>
    <div class="alerts-list" id="alerts-list">
      ${MOCK.alertas.map(a => `
        <div class="alert-card ${a.tipo}" data-tipo="${a.tipo}">
          <div class="alert-icon">
            ${a.tipo === 'high' 
              ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
              : a.tipo === 'medium'
              ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
              : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
            }
          </div>
          <div class="alert-content">
            <div class="alert-title">${a.titulo}</div>
            <div class="alert-desc">${a.desc}</div>
            <div class="alert-meta">
              <span>📁 ${a.categoria}</span>
              <span>🕐 ${a.fecha}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function initAlertasFilters() {
  const filters = document.querySelectorAll('#alertas-filters .filter-btn');
  const list = document.getElementById('alerts-list');
  if (!list) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const cards = list.querySelectorAll('.alert-card');
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.tipo === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ============================
// REPORTES
// ============================
function renderReportes() {
  const reports = [
    { name: 'Informe Anual Ambiental', desc: 'Reporte consolidado de cumplimiento ambiental para presentación ante el MAATE.', date: 'Última generación: 15/01/2026', icon: '📋' },
    { name: 'Reporte de Monitoreo', desc: 'Resultados de monitoreo de agua, aire, suelo y ruido del período actual.', date: 'Última generación: 28/02/2026', icon: '📊' },
    { name: 'Declaración de Residuos', desc: 'Declaración anual de generación y gestión de residuos peligrosos y no peligrosos.', date: 'Última generación: 10/01/2026', icon: '♻️' },
    { name: 'Auditoría Ambiental', desc: 'Informe de auditoría ambiental interna con hallazgos y plan de acción correctiva.', date: 'Última generación: 20/12/2025', icon: '🔍' },
    { name: 'Plan de Manejo Ambiental', desc: 'Documento del PMA actualizado con medidas de prevención y mitigación ambiental.', date: 'Última generación: 01/09/2025', icon: '📝' },
    { name: 'Reporte de Cumplimiento TULSMA', desc: 'Verificación de cumplimiento con los límites de la normativa TULSMA vigente.', date: 'Última generación: 05/03/2026', icon: '✅' },
  ];

  return `
    <div class="section-header">
      <div>
        <h3 class="section-title">Reportes Disponibles</h3>
        <p class="section-subtitle">Genera reportes para cumplimiento normativo y auditorías</p>
      </div>
    </div>
    <div class="reports-grid">
      ${reports.map((r, i) => `
        <div class="report-card" id="report-${i}">
          <div class="report-icon">${r.icon}</div>
          <div class="report-name">${r.name}</div>
          <div class="report-desc">${r.desc}</div>
          <div class="report-footer">
            <span class="report-date">${r.date}</span>
            <button class="btn btn-sm btn-primary report-gen-btn" data-report="${r.name}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Generar
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function initReportButtons() {
  const btns = document.querySelectorAll('.report-gen-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const reportName = btn.dataset.report;
      btn.innerHTML = '<span>Generando...</span>';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Generado';
        btn.style.pointerEvents = '';
        showToast(`${reportName} generado correctamente`);
      }, 1500);
    });
  });
}

// ---- Helpers ----
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' });
}
