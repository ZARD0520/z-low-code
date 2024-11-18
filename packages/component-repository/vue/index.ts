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
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    })
  }
}