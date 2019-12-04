/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

export default [
  {
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/user-profile',
    name: 'Perfil de usuario',
    view: 'users/UserProfile'
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    name: 'Notificaciones',
    view: 'Notifications'
  },
  {
    path: '/user-manager',
    name: 'Gestor de usuarios',
    view: 'users/UserManager'
  },
  {
    path: '/login',
    view: 'users/Login'
  },
  {
    path: '/report-format',
    name: 'Formatos de informe',
    view: 'reports/ReportFormat'
  },
  {
    path: '/report-editor',
    name: 'Editor de informes',
    view: 'reports/ReportEditor'
  },
  {
    path: '/report-list',
    name: 'Lista de informes',
    view: 'reports/ReportList'
  },
  {
    path: '/action-plan-manager',
    name: 'Gestor de planes de acción',
    view: 'action-plan/Manager'
  },
  {
    path: '/action-plan-format-manager',
    name: 'Gestor de formatos para planes de acción',
    view: 'action-plan/FormatManager'
  },
  {
    path: '/action-plan-form',
    name: 'Formulario de plan de accion',
    view: 'action-plan/ActionPlanForm'
  },
  {
    path: '/',
    name: 'Ruta por defecto'
  },
  {
    path: '/action-plan-format-editor',
    name: 'Editor de formatos para planes de acción',
    view: 'action-plan/ActionPlanFormatEditor'
  },
  {
    path: '/nonconformities',
    name: 'No conformidades',
    view: 'reports/nonconformities/NonconformityManager'
  },
  {
    path: '/attachments',
    name: 'Archivos adjuntos',
    view: 'attachments/Attachments'
  }
]
