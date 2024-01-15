import sampleRoutes from './sampleRoutes'
//import i18n from '@/modules/i18n'
//const { t: $t, d: $d, n: $n } = i18n.global
const routes = [
   {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Login.vue'),
      meta: {
         name: 'Login',
         layout: 'DefaultLayout',
         authCheck: false,
      },
   },
   {
      path: '/notfound',
      component: () => import('@/views/error/PageNotFound.vue'),
      meta: {
         name: 'Page Not Found',
         layout: 'ErrorLayout',
         authCheck: false,
      },
   },
   { path: '/:catchAll(.*)', redirect: '/notfound' },
   { path: '/', redirect: '/sample' },
]

routes.push(sampleRoutes)

export default routes
