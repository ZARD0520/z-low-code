import { App, DefineComponent } from 'vue'
// 导入样式
import './index.css'
// 导入二次封装组件
import Test from './components/test/index.vue'

type ComponentNames = 'z-test'

type ComponentObject = {
  [key in ComponentNames]?: DefineComponent<{}, {}, any>
}

const components: ComponentObject = {
  // 存放组件
  'z-test': Test
}

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