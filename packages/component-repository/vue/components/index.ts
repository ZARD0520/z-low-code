// 导入基础组件
import { Button, Input, Radio, RadioGroup, Checkbox, CheckboxGroup, Image, Select, SelectOption, Switch, InputNumber } from 'ant-design-vue'
// 导入二次封装组件
import Test from './Test/index.vue'
// 导入类型
import { ComponentObject } from './type'

// 管理组件
export const components: ComponentObject = {
  'button': Button,
  'input': Input,
  'radio': Radio,
  'radio-group': RadioGroup,
  'checkbox': Checkbox,
  'checkbox-group': CheckboxGroup,
  'image': Image,
  'select': Select,
  'select-option': SelectOption,
  'switch': Switch,
  'input-number': InputNumber,
  'z-test': Test
}