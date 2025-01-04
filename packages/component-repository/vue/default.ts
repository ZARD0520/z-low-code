import type { App } from 'vue'
import { zCharts } from './components/Charts'
import { zDialog } from './components/Dialog'
import { zForm } from './components/Form'
import { zFlex } from './components/Layout/Flex'
import { zGrid } from './components/Layout/Grid'
import { zTabs } from './components/Layout/Tabs'
import { zPagination } from './components/Pagination'
import { zTable } from './components/Table'

const CustomComponents = [
  zCharts,
  zDialog,
  zForm,
  zFlex,
  zGrid,
  zTabs,
  zPagination,
  zTable
]

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