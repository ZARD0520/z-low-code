import { ActionEvent } from './common'

// 操作列
export interface columnOptionType {
  label: string | Function
  hidden: Function
  disabled: Function
  type: number | 'slot'
  attrs: Object
  action: ActionEvent // 事件相关
  children?: Array
}