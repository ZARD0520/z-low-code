import { FormColumn, FormColumnChild } from "@/type";
import { ComponentInternalInstance, computed, defineComponent, getCurrentInstance, onMounted, PropType, ref, useAttrs } from "vue";
import { ElForm, ElFormItem } from "element-plus";
import { components } from "../index";

export default defineComponent({
  name: 'z-form',
  components: {
    ElForm,
    ElFormItem
  },
  props: {
    formColumns: {
      type: Array as PropType<FormColumn[]>,
      default: () => []
    }
  },
  setup(props, { slots, expose }) {
    const formRef: any = ref()
    const attrs: any = useAttrs()
    const { proxy } = getCurrentInstance() as ComponentInternalInstance

    const vFormColumns = computed(() => props.formColumns)

    const checkDataInit = () => {
      const formItems = vFormColumns.value.filter((item: FormColumn) => !item.slot && !item.parentSlot)
      formItems.forEach((item: FormColumn) => {
        if (attrs.model[item.prop] === undefined) {
          console.warn(`推荐在model初始化${item.prop}`)
        }
      })
    }

    const showChild = (column: FormColumn) => {
      return !!column.children
    }

    const bindChildAttr = (item: FormColumn, childItems: any) => {
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

    const getChildItemAttr = (child: any) => {
      if (!child) {
        return {}
      }
      const result: any = {}

      Object.keys(child).forEach((key: string) => {
        if (!['slot'].includes(key)) {
          result[key] = child[key]
        }
      })
      return result
    }

    const getFormItemAttr = (column: FormColumn) => {
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

    const getTagAttr = (attrs: any) => {
      if (!attrs) {
        return {}
      }
      const result: any = {}
      Object.keys(attrs).forEach((key) => {
        if (!['remote-method', 'updateAction', 'changeAction'].includes(key)) {
          result[key] = attrs[key]
        }
      })
      return result
    }

    const handleRemote = (column: FormColumn, columnAttrs: any) => {
      const fn = column.attrs && column.attrs['remote-method']
      if (fn) {
        columnAttrs['remote-method'] = async (query: string) => {
          const res = await fn(query)
          if (res && column.children) {
            column.children.options = res
          }
        }
      }
    }

    const handleDisabled = (columnAttrs: any) => {
      const disabled = columnAttrs.disabled
      if (typeof disabled === 'function') {
        columnAttrs.disabled = disabled()
      }
    }

    const handleHidden = (hidden: Boolean | Function | undefined) => {
      if (hidden === undefined) {
        return false
      }
      if (typeof hidden === 'boolean') {
        return hidden
      }
      if (typeof hidden === 'function') {
        return hidden(attrs.model)
      }
    }

    const validateForm = async () => {
      const valid = await formRef?.value?.validateForm()
      return valid
    }

    const resetValidateForm = () => {
      formRef?.value?.resetFields()
    }

    onMounted(() => {
      checkDataInit()
    })

    expose({
      validateForm,
      resetValidateForm
    })

    return () => {
      return <ElForm ref="formRef" {...attrs}>
        {vFormColumns.value.map((column: FormColumn) => {
          // handle with hidden
          if (handleHidden(column.hidden)) {
            return
          }
          // handle with parentSlot/slot/component
          if (column.parentSlot) {
            const slot = slots[column.parentSlot]
            return slot instanceof Function ? slot({ row: attrs.model, column }) : ''
          } else {
            let component, children
            if (column.slot) {
              const slot = slots[column.slot]
              component = slot instanceof Function ? slot({ row: attrs.model, column }) : ''
            } else if (column.type) {
              const tag = components[column.type]
              const columnAttrs = { ...getTagAttr(column.attrs) }
              handleRemote(column, columnAttrs)
              handleDisabled(columnAttrs)

              if (showChild(column)) {
                if (!column.children?.type) {
                  return
                }
                const childTag = components[column.children?.type]
                children = column.children?.options?.map((child: any) => {
                  const childAttrs = bindChildAttr(column, child)
                  const childSlot = slots[child.slot]
                  return <childTag {...getChildItemAttr({ ...childAttrs, ...child })}>{
                    child.slot && childSlot instanceof Function ? childSlot() : (childAttrs.text || child.label || '')
                  }</childTag>
                })
              }
              component = <tag {...columnAttrs} v-model={attrs.model[column.prop]} onChange={column?.attrs?.changeAction} onUpdate={column?.attrs?.updateAction}>{children}</tag>
            }
            return <ElFormItem {...getFormItemAttr(column)} key={column.prop}> {component} </ElFormItem>
          }
        })}
      </ElForm>
    }

  }
})