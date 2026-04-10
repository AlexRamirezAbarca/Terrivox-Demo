# Base de Conocimientos - Terrivox (Fase 1)

## 1. Visión y Alcance del Proyecto
**Objetivo Principal (Fase 1):** Proveer una demo funcional a empresas orientada a mitigar el **"Desfase en la ejecución de las medidas de acuerdo a la frecuencia en los planes de manejo"**. 
*Nota: Un "Plan de Manejo" se define como el cronograma de actividades a realizar anualmente.*

**Concepto Arquitectónico Central:** Terrivox se concibe, construye y diseña desde su génesis como un **ERP moldeable**. Esto garantiza que la plataforma no sea solo una herramienta de un solo propósito, sino una suite escalable capaz de adaptarse a cualquier entorno o industria en el futuro.

## 2. Funcionalidades Principales a Construir en Fase 1
1. **Subida de Información:** Interface para que el usuario pueda cargar archivos Excel (el formato ya lo proporciona el cliente).
2. **Creación Automática de Indicadores:** Generación en tiempo real de gráficas, métricas y KPIs basándose en el análisis de los datos extraídos de la plantilla de Excel.
3. **Módulo de Agenda Recordatoria:** Un cronograma central donde el usuario puede visualizar de forma gráfica e interactiva la calendarización anual y el estado de sus medidas/actividades.
4. **Sistema de Notificaciones Omnicanal:**
   - **Conectividad WhatsApp:** APIs integradas para disparar recordatorios automáticos directamente al móvil.
   - **Conectividad Correo Electrónico:** Envío de resúmenes, recordatorios directos o logs de ejecución a las casillas de correo.
5. **Paneles de Control (Dashboards):**
   - **Dashboard Administrador:** Vista gerencial para supervisar todos los planes de manejo, usuarios, métricas globales y configuración del ERP.
   - **Dashboard Usuario:** Vista focalizada en sus propias tareas asignadas, recordatorios y estado de progreso personal.
6. **Estructura PWA (Progressive Web App):** Diseño web progresivo para que actúe como una app nativa en dispositivos móviles (icono en pantalla de inicio, tiempos de carga rápidos, notificaciones integradas).

## 3. Planificación y Tiempos de Desarrollo (Desarrollo IA-Agente Asistido)
*Adoptando el modelo de desarrollo automatizado/asistido por IA, los tiempos y recursos se optimizan dramáticamente en comparación con el desarrollo de software convencional.*

* **Semana 1: Análisis, Estructura PWA y Base de Datos**
  - Setup del entorno, diseño del modelo de datos ERP (Adaptable).
  - Creación del log-in y perfiles (Admin vs Usuario).
* **Semana 2: Carga de Datos y Procesamiento**
  - Programación del módulo de ingesta y parseo del Excel.
  - Diseño en base de datos de los Cronogramas Anuales.
  - Vista inicial de la Agenda Recordatoria.
* **Semana 3: Dashboards y Generación de Indicadores automáticos**
  - Análisis de los datos procesados e integración de librerías para gráficos interactivos.
  - Desarrollo final del Dashboard de Administrador y Usuario.
* **Semana 4: Integraciones (Email/WhatsApp) y Deployment**
  - Conexión con proveedores de mensajería (ej.: Twilio/Meta para WP, SendGrid o Resend para Emails).
  - Motores de cron-jobs (tareas programadas) para envío de recordatorios automático.
  - QA, refinamientos visuales PWA y entrega de la Demo.
**Total Tiempo Estimado:** 4 Semanas de desarrollo activo (fase Demo).

## 4. Costes Operativos 
*(Estimación de gastos fijos mensuales para sostener la infraestructura de Fase 1 - Los costes de desarrollo por HH* se reducen drásticamente por el uso de Agentes-IA).*
- **Alojamiento (Hosting / DB):** $0 - $25/mes (servicios como Vercel/Railway o Supabase, usualmente $0 en fase de test, muy barato en etapa de crecimiento).
- **Procesamiento de Correos:** ~$0 - $15/mes.
- **Integración WhatsApp Business API:** Dependerá del volumen, pero se estima un costo de ~$0.015 por mensaje enviado mediante proveedores, más una cuota plana (~$15-$25/mes) dependiendo la plataforma conector.
- **Coste de Licencias / Herramientas:** $0 (Todo en framework y librerías Open Source: React/Vite/Node, etc.).

## 5. Proyección Ganada (El Retorno de Inversión)
- **Para la empresa cliente:** La erradicación del "Desfase en la ejecución" evita penalidades gubernamentales y de auditorías. Cumplimiento de actividades anuales al 100%. Generación de valor y paz mental para la gerencia.
- **Para Terrivox (Software-como-Servicio / ERP):** Posibilidad de moldear y revender esta misma solución con un costo marginal cercano a $0 para el siguiente cliente. Al concebirse como un ERP, a la empresa que compra la Fase 1 eventualmente se le pueden realizar up-sells con módulos de RRHH, Vehículos, Finanzas, y otros directamente integrados sobre la misma plataforma central.
