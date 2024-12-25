import { initConstant, InitConstantArray } from '../utils/constant'
import { columnType, componentType } from './formEnum'

export const { map: columnTypeMap, options: columnTypeOptions } = initConstant(columnType as InitConstantArray)
export const { map: componentTypeMap, options: componentTypeOptions } = initConstant(componentType as InitConstantArray)
