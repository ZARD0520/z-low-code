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