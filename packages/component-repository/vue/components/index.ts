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
import Test from './Test/index.vue'
import Flex from './Layout/Flex/index.vue'
import Grid from './Layout/Grid/index.vue'
import Tabs from './Layout/Tabs/index.vue'
import Charts from './Charts/index.vue'
// 导入类型
import { ComponentObject } from '@/type/form'

// 管理组件
export const components: ComponentObject = {
  'z-button': ElButton,
  'z-input': ElInput,
  'z-radio': ElRadio,
  'z-radio-group': ElRadioGroup,
  'z-checkbox': ElCheckbox,
  'z-checkbox-group': ElCheckboxGroup,
  'z-image': ElImage,
  'z-select': ElSelect,
  'z-select-option': ElOption,
  'z-switch': ElSwitch,
  'z-input-number': ElInputNumber,
  'z-row': ElRow,
  'z-col': ElCol,
  'z-flex': Flex,
  'z-grid': Grid,
  'z-tabs': Tabs,
  'z-charts': Charts,
  'z-test': Test,
}