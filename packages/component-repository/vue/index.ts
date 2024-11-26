import { App } from 'vue'
import { ComponentNames, ComponentObject } from '@/type'
import { components } from '@/components'
// 导入样式
import '@/index.css'

const componentMap: ComponentObject = {}

export default {
  install(app: App, registerComponents?: ComponentNames[]) {
    if (registerComponents) {
      // 指定注册
      registerComponents.forEach((name) => {
        if (components[name]) {
          componentMap[name] = components[name]
          app.component(name, components[name])
        }
      })
    } else {
      // 全量注册
      Object.entries(components).forEach(([name, component]) => {
        componentMap[name as keyof ComponentObject] = component
        app.component(name, component);
      })
    }
    app.config.globalProperties.$componentMap = componentMap
  }
}