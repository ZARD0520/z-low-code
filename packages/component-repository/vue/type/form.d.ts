import { DefineComponent, PropType } from 'vue'
import { ComponentNames } from '../common/type/formType'
import { ButtonProps, InputProps, RadioProps, RadioGroupProps, CheckboxProps, checkboxGroupProps, ImageProps, SwitchProps, InputNumberProps } from 'element-plus'

// 支持的组件
export type ComponentObject = {
  [key in ComponentNames]?: DefineComponent<{}, {}, any> | PropType<ButtonProps | InputProps | RadioProps | RadioGroupProps | CheckboxProps | checkboxGroupProps | ImageProps | SwitchProps | InputNumberProps>
}

export interface FormColumnChild {
  options?: Array<any>
  type?: ComponentNames
  attrs?: Record<string, any>
}

export interface FormColumn {
  prop: string
  label: string
  columnType: number
  type: ComponentNames
  parentSlot?: string
  slot?: string
  options?: Array<{ label: string, value: any }> // 仅用于 select 类型
  attrs?: Record<string, any> // 额外的属性，如 placeholder、minlength 等
  children?: FormColumnChild
  labelWidth?: string | number
  hidden?: boolean | Function
  // 其他需要的属性
}

export interface FormModel {
  [key: string]: string | number | boolean | undefined | Array<any> // 根据实际需要扩展
}

export interface FormRules {
  [key: string]: Array<{
    required: boolean
    message: string
    trigger: string
    // 其他需要的属性
  }>
}