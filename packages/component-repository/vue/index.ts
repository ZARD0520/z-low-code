import { App } from 'vue'
import { ComponentObject } from '@/type/form'
import { components } from '@/components'
import { componentTypeMap } from 'component-common'
// 导入样式
import './index.css'
import 'element-plus/dist/index.css'

const componentMap: ComponentObject = {}

export default {
  install(app: App, registerComponents?: number[]) {
    if (registerComponents) {
      // 指定注册
      registerComponents.forEach((componentKey) => {
        const key = Number(componentKey)
        const name = componentTypeMap.get(key)
        if (name && components[key]) {
          componentMap[key] = components[key]
          app.component(name, components[key])
        }
      })
    } else {
      // 全量注册
      Object.entries(components).forEach(([componentKey, component]) => {
        const key = Number(componentKey)
        const name = componentTypeMap.get(key)
        if (name) {
          componentMap[key] = component
          app.component(name, component as any);
        }
      })
    }
    app.config.globalProperties.$componentMap = componentMap
  }
}