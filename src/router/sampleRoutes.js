const defaultPath = '/sample'
const getMeta = (name) => {
   return {
      name: name,
      layout: 'SampleLayout',
   }
}

const managerRoutes = {
   path: defaultPath,
   redirect: defaultPath + '/axios',
   children: [
      {
         path: defaultPath + '/axios',
         name: 'Axios',
         component: () => import('@/views/sample/Axios.vue'),
         meta: getMeta('Axios Test'),
      },
      {
         path: defaultPath + '/util',
         name: 'Util',
         component: () => import('@/views/sample/Util.vue'),
         meta: getMeta('Util Test'),
      },

      {
         path: defaultPath + '/table',
         name: 'Table',
         component: () => import('@/views/sample/Table.vue'),
         meta: getMeta('Table Test'),
      },
      {
         path: defaultPath + '/pagination',
         name: 'Pagination',
         component: () => import('@/views/sample/Pagination.vue'),
         meta: getMeta('Pagination Test'),
      },
      {
         path: defaultPath + '/form',
         name: 'Form',
         component: () => import('@/views/sample/Form.vue'),
         meta: getMeta('Form Test'),
      },
      {
         path: defaultPath + '/form-component',
         name: 'FormComponent',
         component: () => import('@/views/sample/FormComponent.vue'),
         meta: getMeta('Form Component'),
      },
      {
         path: defaultPath + '/date',
         name: 'Date',
         component: () => import('@/views/sample/Date.vue'),
         meta: getMeta('Date Picker Test'),
      },
      {
         path: defaultPath + '/calendar',
         name: 'Calendar',
         component: () => import('@/views/sample/Calendar.vue'),
         meta: getMeta('Calendar Test'),
      },
      {
         path: defaultPath + '/calendar-custom',
         name: 'CalendarCustom',
         component: () => import('@/views/sample/CalendarCustom.vue'),
         meta: getMeta('Calendar Test'),
      },
      {
         path: defaultPath + '/message',
         name: 'Message',
         component: () => import('@/views/sample/Message.vue'),
         meta: getMeta('menu.message'),
      },
      {
         path: defaultPath + '/i18n',
         name: 'I18N',
         component: () => import('@/views/sample/I18N.vue'),
         meta: getMeta('menu.language'),
      },
      {
         path: defaultPath + '/echart',
         name: 'Echart',
         component: () => import('@/views/sample/Echart.vue'),
         meta: getMeta('Echart Test'),
      },
      {
         path: defaultPath + '/editor',
         name: 'Editor',
         component: () => import('@/views/sample/Editor.vue'),
         meta: getMeta('Quasar Test'),
      },
   ],
}

export default managerRoutes
