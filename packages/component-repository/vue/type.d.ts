import { ButtonProps, CheckboxGroupProps, CheckboxProps, InputNumberProps, InputProps, RadioGroupProps, RadioProps, SwitchProps } from 'ant-design-vue'
import { SelectProps, OptionProps } from 'ant-design-vue/es/select'
import { DefineComponent } from 'vue'

// 支持的组件名
export type ComponentNames = 'z-test' | 'button' | 'input' | 'radio' | 'radio-group' | 'checkbox' | 'checkbox-group' | 'image' | 'select' | 'select-option' | 'switch' | 'input-number'

// 支持的组件
export type ComponentObject = {
  [key in ComponentNames]?: DefineComponent<{}, {}, any> | PropType<ButtonProps | InputProps | RadioProps | RadioGroupProps | CheckboxProps | CheckboxGroupProps | ImageProps | SelectProps | OptionProps | SwitchProps | InputNumberProps>
}


/* 分页相关 */

// 分页参数类型
export interface PaginationParamsType {
  api: apiType
}

// 分页执行器类型
export interface PaginationActionType {
  current: number
  pageSize: number
  filters: Object,
  sorter: Object
}

// 分页类型
export interface PageInfoType {
  total: number // 总条目数
  pageSize: number // 每页显示条目个数
  current: number // 当前页
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
