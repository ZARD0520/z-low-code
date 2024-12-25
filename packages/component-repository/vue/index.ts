import { App } from 'vue'
import { ComponentObject } from '@/type/form'
import { components } from '@/components'
import { componentTypeMap } from '../common/enum'
// 导入样式
import './index.css'
import 'element-plus/dist/index.css'

const componentMap: ComponentObject = {}

export default {
  install(app: App, registerComponents?: number[]) {
    if (registerComponents) {
      // 指定注册
      registerComponents.forEach((componentKey) => {
        const name = componentTypeMap.get(componentKey)
        if (name && components[componentKey]) {
          componentMap[componentKey] = components[componentKey]
          app.component(name, components[componentKey])
        }
      })
    } else {
      // 全量注册
      Object.entries(components).forEach(([componentKey, component]) => {
        const name = componentTypeMap.get(componentKey)
        if (name) {
          componentMap[componentKey] = component
          app.component(name, component);
        }
      })
    }
    app.config.globalProperties.$componentMap = componentMap
  }
}