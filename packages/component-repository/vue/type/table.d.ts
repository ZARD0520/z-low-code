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