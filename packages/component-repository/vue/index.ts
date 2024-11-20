import { App, DefineComponent } from 'vue'
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
import 'ant-design-vue/dist/antd.css'
// 导入二次封装组件

interface ComponentObject {
  'z-button'?: ButtonProps
  'z-input'?: InputProps
  'z-input-number'?: InputNumberProps
  'z-select'?: SelectProps
  'z-select-option'?: OptionProps
  'z-radio'?: RadioProps
  'z-radio-group'?: RadioGroupProps
  'z-checkbox'?: CheckboxProps
  'z-checbbox-group'?: CheckboxGroupProps
  'z-date-picker'?: DatePickerProps
  'z-switch'?: SwitchProps
}

const components: ComponentObject = {
  // 存放组件
  'z-button': Button as ButtonProps,
  'z-input': Input as InputProps,
  'z-input-number': InputNumber as InputNumberProps,
  'z-select': Select as SelectProps,
  'z-select-option': SelectOption as OptionProps,
  'z-radio': Radio as RadioProps,
  'z-radio-group': RadioGroup as RadioGroupProps,
  'z-checkbox': Checkbox as CheckboxProps,
  'z-checbbox-group': CheckboxGroup as CheckboxGroupProps,
  'z-date-picker': DatePicker as DatePickerProps,
  'z-switch': Switch as SwitchProps
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