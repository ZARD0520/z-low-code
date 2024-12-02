import { DefineComponent, PropType } from 'vue'

import { ButtonProps, InputProps, RadioProps, RadioGroupProps, CheckboxProps,checkboxGroupProps, ImageProps, SwitchProps, InputNumberProps } from 'element-plus'

/* Form相关 */

// 支持的组件名
export type ComponentNames = 'z-test' | 'z-button' | 'z-input' | 'z-radio' | 'z-radio-group' | 'z-checkbox' | 'z-checkbox-group' | 'z-image' | 'z-select' | 'z-select-option' | 'z-switch' | 'z-input-number'

// 支持的组件
export type ComponentObject = {
  [key in ComponentNames]?: DefineComponent<{}, {}, any> | PropType<ButtonProps | InputProps | RadioProps | RadioGroupProps | CheckboxProps | checkboxGroupProps | ImageProps | SwitchProps | InputNumberProps>
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
