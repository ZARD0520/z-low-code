import { DefineComponent, PropType } from 'vue'

import { ButtonProps, InputProps, RadioProps, RadioGroupProps, CheckboxProps,checkboxGroupProps, ImageProps, SwitchProps, InputNumberProps } from 'element-plus'

/* Form相关 */

// 支持的组件名
export type ComponentNames = 'z-test' | 'z-button' | 'z-input' | 'z-radio' | 'z-radio-group' | 'z-checkbox' | 'z-checkbox-group' | 'z-image' | 'z-select' | 'z-select-option' | 'z-switch' | 'z-input-number'

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
  type?: ComponentNames
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


/* 分页相关 */

// 分页参数类型
export interface PaginationParamsType {
  api: apiType
}

// 分页执行器类型
export interface PaginationActionType {
  current: number
  size: number
}

// 分页类型
export interface PageInfoType {
  total: number // 总条目数
  size: number // 每页显示条目个数
  current: number // 当前页
  count?: number // 总页数
}

// 分页api类型
export interface apiType {
  get: (current: number, size: number, params: any) => {
    data: any,
    total: number
  },
  params: Object
}


/* Table相关 */

// 操作列
export interface columnOptionType {
  label: string | Function
  hidden: Function
  disabled: Function
  type: ComponentNames | 'slot'
  attrs: Object
  action: Function
  children?: Array
}
