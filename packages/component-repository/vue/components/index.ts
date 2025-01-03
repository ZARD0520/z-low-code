import { zCharts } from './Charts'
import { zDialog } from './Dialog'
import { zForm } from './Form'
import { zFlex } from './Layout/Flex'
import { zGrid } from './Layout/Grid'
import { zTabs } from './Layout/Tabs'
import { zPagination } from './Pagination'
import { zTable } from './Table'

// 按需导出
export * from './Charts'
export * from './Dialog'
export * from './Form'
export * from './Layout/Flex'
export * from './Layout/Grid'
export * from './Layout/Tabs'
export * from './Pagination'
export * from './Table'

// 全量导出
export default [
  zCharts,
  zDialog,
  zForm,
  zFlex,
  zGrid,
  zTabs,
  zPagination,
  zTable
]