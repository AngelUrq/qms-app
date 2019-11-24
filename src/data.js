let local = true // change this

export const backendURL = local ? 'http://localhost:3000' : 'http://18.228.190.107:3000'
export const production = true
export const pathAccepted = '/dashboard'
export const defaultRoute = '/login'
export const actionPlanExample = {
  rows: [
    [
      {
        name: 'Fecha de la observación',
        fieldType: 'horizontal',
        value: 'Julio 2018'
      },
      {
        name: 'Nº de Formulario',
        fieldType: 'horizontal',
        value: '94 I-2018'
      }
    ],
    [
      {
        name: 'Área',
        fieldType: 'horizontal',
        value: 'Postgrado La Paz'
      },
      {
        name: 'Auditor/persona que realizó la observación',
        fieldType: 'horizontal',
        value: 'A. Fernández V. Verduguez D. Revilla'
      }
    ],
    [
      {
        name: 'Norma',
        fieldType: 'horizontal',
        value: 'ISO 9001:2015'

      },
      {
        name: 'Cláusula Afectada de la Norma',
        fieldType: 'horizontal',
        value: '8.6'
      }
    ],
    [
      {
        name: 'TIPO DE HALLAZGO',
        fieldType: 'title',
        value: 'TIPO DE HALLAZGO'
      }
    ],
    [
      {
        name: 'No conformidad',
        fieldType: 'horizontal',
        value: ''
      },
      {
        name: 'Observación',
        fieldType: 'horizontal',
        value: ''
      },
      {
        name: 'Recomendación',
        fieldType: 'horizontal',
        value: ''
      }
    ],
    [
      {
        name: 'DESCRIPCIÓN DE LA OBSERVACIÓN',
        fieldType: 'vertical',
        value: '94. No conformidad: No se evidencias resultados de la evaluación docente de Ricardo.'
      }
    ]
  ]
}
