import { App, DefineComponent } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// 引入二次封装组件

interface ComponentObject {
  [key: string]: DefineComponent<{}, {}, any>;
}

const components: ComponentObject = {
  // 存放组件
}

export default {
  install(app: App, componentMap: ComponentObject, registerComponents?: string[]) {
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
        componentMap[name] = components[name]
        app.component(name, component);
      })
    }
  }
}