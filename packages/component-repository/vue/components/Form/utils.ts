import { FormColumn } from "@/type/form"

export const showChild = (column: FormColumn) => {
  return !!column.children && column.children?.type
}

export const bindChildAttr = (item: FormColumn, childItems: any) => {
  if (item.children) {
    const { attrs } = item.children
    if (typeof attrs === 'function') {
      return attrs(childItems)
    }
    if (typeof attrs === 'object') {
      return attrs
    }
  }

  return {}
}

export const getChildItemAttr = (child: any, childTag: any) => {
  if (!child) {
    return {}
  }
  const result: any = {}

  Object.keys(child).forEach((key: string) => {
    if (!['slot'].includes(key)) {
      result[key] = child[key]
    }
  })

  // 对单选、多选进行单独处理(如后续升级到element3.0+，就不需要这个操作)
  if (['ElRadio', 'ElCheckbox'].includes(childTag.name)) {
    result.label = result.value
    result.value = undefined
  }
  return result
}

export const getFormItemAttr = (column: FormColumn) => {
  if (!column) {
    return {}
  }
  const result: any = {}

  Object.keys(column).forEach((key) => {
    if (!['attr', 'type', 'children'].includes(key)) {
      result[key] = column[key as keyof FormColumn]
    }
  })
  return result
}

export const getTagAttr = (attrs: any) => {
  if (!attrs) {
    return {}
  }
  const result: any = {}
  Object.keys(attrs).forEach((key) => {
    result[key] = attrs[key]
  })
  return result
}

export const handleRemote = (column: FormColumn, columnAttrs: any) => {
  const fn = column.actions && column.actions['remote-method']
  if (fn) {
    columnAttrs['remote-method'] = async (query: string) => {
      try {
        const res = await fn(query)
        if (res && column.children) {
          column.children.options = res
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export const handleDisabled = (columnAttrs: any, model: any) => {
  const disabled = columnAttrs.disabled
  if (typeof disabled === 'function') {
    columnAttrs.disabled = disabled(model)
  }
}

export const handleHidden = (hidden: Boolean | Function | undefined, model: any) => {
  if (hidden === undefined) {
    return false
  }
  if (typeof hidden === 'boolean') {
    return hidden
  }
  if (typeof hidden === 'function') {
    return hidden(model)
  }
}

export const hasModel = (component) => {
  // 检查组件是否有 model 选项，并且值为 true
  return component.props && component.props.model !== undefined;
}