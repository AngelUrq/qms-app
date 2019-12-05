export const userView =
{
  items: [
    {
      icon: 'mdi-clipboard-outline',
      text: 'Planes de acción',
      containsSubitems: true,
      subitems: [
        {
          to: '/action-plan-manager',
          text: 'Gestor'
        }
      ]
    },
    {
      to: '/user-profile',
      icon: 'mdi-account',
      text: 'Perfil',
      containsSubitems: false
    },
    {
      to: '/notifications',
      icon: 'mdi-bell',
      text: 'Notificaciones',
      containsSubitems: false
    }
  ]
}

export const adminView = {
  items: [
    {
      to: '/dashboard',
      icon: 'mdi-view-dashboard',
      text: 'Panel de administración',
      containsSubitems: false
    },
    {
      icon: 'mdi-clipboard-text-outline',
      text: 'Informes',
      containsSubitems: true,
      subitems: [
        {
          to: '/nonconformities',
          text: 'No conformidades'
        },
        {
          to: '/report-format',
          text: 'Formatos'
        },
        {
          to: '/report-editor',
          text: 'Editor'
        },
        {
          to: '/report-list',
          text: 'Cargar'
        }
      ]
    },
    {
      icon: 'mdi-clipboard-outline',
      text: 'Planes de acción',
      containsSubitems: true,
      subitems: [
        {
          to: '/action-plan-manager',
          text: 'Gestor'
        },
        {
          to: '/action-plan-format-manager',
          text: 'Formatos'
        }
      ]
    },
    {
      to: '/user-profile',
      icon: 'mdi-account',
      text: 'Perfil',
      containsSubitems: false
    },
    {
      to: '/user-manager',
      icon: 'mdi-account-group',
      containsSubitems: false,
      text: 'Gestor de usuarios'
    },
    {
      to: '/',
      icon: 'mdi-logout',
      containsSubitems: false,
      text: 'Cerrar sesión'
    }
  ]
}
