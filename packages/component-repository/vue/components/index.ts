// 导入基础组件
import {
  ElButton,
  ElInput,
  ElRadio,
  ElRadioGroup,
  ElCheckbox,
  ElCheckboxGroup,
  ElImage,
  ElSelect,
  ElOption,
  ElSwitch,
  ElInputNumber,
  ElRow,
  ElCol
} from 'element-plus'
// 导入二次封装组件
import Flex from './Layout/Flex/index.vue'
import Grid from './Layout/Grid/index.vue'
import Tabs from './Layout/Tabs/index.vue'
import Charts from './Charts/index.vue'
import Dialog from './Dialog/index.vue'
import { ComponentObject } from '@/type/form'

// 管理组件
export const components: ComponentObject = {
  1: ElButton,
  2: ElInput,
  3: ElRadio,
  4: ElRadioGroup,
  5: ElCheckbox,
  6: ElCheckboxGroup,
  7: ElSelect,
  8: ElOption,
  9: ElSwitch,
  10: ElInputNumber,
  11: ElRow,
  12: ElCol,
  13: Flex,
  14: Grid,
  15: Tabs,
  16: Charts,
  17: Dialog,
  18: ElImage,
}