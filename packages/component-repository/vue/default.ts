import type { App, Plugin } from 'vue'
import CustomComponents from './components/index'

const INSTALLED_KEY = Symbol('INSTALLED_KEY')

const makeInstaller = (components: any[] = []) => {
  const install = (app: App) => {
    if (app[INSTALLED_KEY]) return
    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))
  }
  return {
    install
  }
}

export default makeInstaller([...CustomComponents])