import { initConstant } from '../utils/constant'
import { columnType, componentType } from './formEnum'
import type { InitConstantArray } from '../types/constant'

export const { map: columnTypeMap, options: columnTypeOptions } = initConstant(columnType as InitConstantArray)
export const { map: componentTypeMap, options: componentTypeOptions } = initConstant(componentType as InitConstantArray)
