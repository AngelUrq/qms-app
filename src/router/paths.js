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
    path: '/reports',
    name: 'Informes',
    view: 'Reports'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
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
    view: 'Notifications'
  },
  {
    path: '/user-manager',
    name: 'Gestor de usuarios',
    view: 'UserManager'
  },
  {
    path: '/login',
    view: 'Login'
  },
  {
    path: '/report-format',
    name: 'Formatos de informe',
    view: 'ReportFormat'
  },
  {
    path: '/report-editor',
    name: 'Editor de informes',
    view: 'ReportEditor'
  },
  {
    path: '/report-list',
    name: 'Lista de informes',
    view: 'ReportList'
  },
  {
    path: '/action-plan-format-manager',
    name: 'Gestor de formatos para planes de acción',
    view: 'action-plan/FormatManager'
  },
  {
    path: '/',
    name: 'Ruta por defecto'
  }
]
