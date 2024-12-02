// 导入基础组件
import { ElButton, ElInput, ElRadio, ElRadioGroup, ElCheckbox, ElCheckboxGroup, ElImage, ElSelect, ElOption, ElSwitch, ElInputNumber } from 'element-plus'
// 导入二次封装组件
import Test from './Test/index.vue'
// 导入类型
import { ComponentObject } from '@/type'

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
  'z-test': Test
}