import { ButtonProps, CheckboxGroupProps, CheckboxProps, InputNumberProps, InputProps, RadioGroupProps, RadioProps, SwitchProps } from 'ant-design-vue'
import { SelectProps, OptionProps } from 'ant-design-vue/es/select'
import { DefineComponent } from 'vue'

// 支持的组件名
export type ComponentNames = 'z-test' | 'button' | 'input' | 'radio' | 'radio-group' | 'checkbox' | 'checkbox-group' | 'image' | 'select' | 'select-option' | 'switch' | 'input-number'

// 支持的组件
export type ComponentObject = {
  [key in ComponentNames]?: DefineComponent<{}, {}, any> | PropType<ButtonProps | InputProps | RadioProps | RadioGroupProps | CheckboxProps | CheckboxGroupProps | ImageProps | SelectProps | OptionProps | SwitchProps | InputNumberProps>
}

// 分页类型
export interface PageInfoType {
  total: number // 总条目数
  pageSize: number // 每页显示条目个数
  current: number // 当前页
}