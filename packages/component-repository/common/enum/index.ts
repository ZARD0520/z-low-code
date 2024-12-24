import { initConstant, InitConstantArray } from '../utils/constant'
import { columnType } from './formEnum'

export const { map: columnTypeMap, options: columnTypeOptions } = initConstant(columnType as InitConstantArray)