// 初始化常量
interface Option {
  label: string
  value: number | string | boolean
}
interface InitConstantResult {
  map: Map<number | string | boolean, string>
  options: Option[]
}
export type InitConstantArray = [number | string | boolean, string][]

