import type { InitConstantArray, InitConstantResult } from "../types/constant"

export const initConstant = (ary: InitConstantArray): InitConstantResult => {
  const map = new Map(ary)
  const options = Array.from(map, ([value, label]) => ({ label, value }))
  return { map, options }
}
