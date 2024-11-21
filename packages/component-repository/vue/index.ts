import { App, PropType } from 'vue'
// 导入基础组件
import {
  Button,
  Input,
  InputNumber,
  Select,
  SelectOption,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Switch
} from 'ant-design-vue'
// 导入类型
import type { ButtonProps } from 'ant-design-vue/es/button'
import type { InputProps } from 'ant-design-vue/es/input'
import type { InputNumberProps } from 'ant-design-vue/es/input-number'
import type { SelectProps, OptionProps } from 'ant-design-vue/es/select'
import type { RadioProps, RadioGroupProps } from 'ant-design-vue/es/radio'
import type { CheckboxProps, CheckboxGroupProps } from 'ant-design-vue/es/checkbox'
import type { DatePickerProps } from 'ant-design-vue/es/date-picker'
import type { SwitchProps } from 'ant-design-vue/es/switch'
// 导入样式
import './index.css'
// 导入二次封装组件

type ComponentNames =
  'z-button' | 'z-input' | 'z-input-number' | 'z-select' | 'z-select-option' | 'z-radio' | 'z-radio-group' | 'z-checkbox' | 'z-checkbox-group' | 'z-date-picker' | 'z-switch'

type ComponentObject = Partial<Record<ComponentNames, PropType<ButtonProps | InputProps | InputNumberProps | SelectProps | OptionProps | RadioProps | RadioGroupProps | CheckboxProps | CheckboxGroupProps | DatePickerProps | SwitchProps>>>

const components: ComponentObject = {
  // 存放组件
  'z-button': Button,
  'z-input': Input,
  'z-input-number': InputNumber,
  'z-select': Select,
  'z-select-option': SelectOption,
  'z-radio': Radio,
  'z-radio-group': RadioGroup,
  'z-checkbox': Checkbox,
  'z-checkbox-group': CheckboxGroup,
  'z-date-picker': DatePicker,
  'z-switch': Switch
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