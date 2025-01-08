import installer from './default'
// 导入样式
import './index.css'
import 'element-plus/dist/index.css'

// 支持按需导入
export * from './components/index'
export * from 'element-plus'

// 支持全量导入
export default installer