import { useAuthStore } from './auth/useAuth.js'
import { useDrawerOpenStore } from './page/useDrawerOpen.js'
import { useTemporaryStorage } from './page/useTemporaryStorage.js'

const useStore = () => ({
   auth: useAuthStore(),
   drawerOpen: useDrawerOpenStore(),
   storage: useTemporaryStorage(),
})

export default useStore
