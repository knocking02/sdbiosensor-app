import sampleApi from './api/sampleApi'
import commonApi from './api/commonApi'
import businessApi from './api/businessApi'

const serviceApi = Object.assign(sampleApi, commonApi, businessApi)

export default {
   install: (app, options = {}) => {
      app.config.globalProperties.$axios = serviceApi
   },
}
