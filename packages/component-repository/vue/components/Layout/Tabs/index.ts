import Component from './index.vue'

// 为组件提供 install 安装方法，供按需引入
Component.install = function (Vue) {
  Vue.component('z-tabs', Component)
};

// 默认导出组件
export {
  Component as zTabs,
}