import { FormColumn } from "@/type";
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

    const getChildItemAttr = (child: any, childTag: any) => {
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

    const handleDisabled = (columnAttrs: any) => {
      const disabled = columnAttrs.disabled
      if (typeof disabled === 'function') {
        columnAttrs.disabled = disabled(attrs.model)
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

    const hasModel = (component) => {
      // 检查组件是否有 model 选项，并且值为 true
      return component.props && component.props.model !== undefined;
    }

    // 组件渲染
    const renderComponent = (column: FormColumn) => {
      let children
      const tag: any = components[column.type]
      const columnAttrs = { ...getTagAttr(column.attrs) }
      handleRemote(column, columnAttrs)
      handleDisabled(columnAttrs)

      // 是否支持v-model
      const isModelSupported = hasModel(tag)

      if (!isModelSupported) {
        return <tag {...columnAttrs} key={column.prop}></tag>
      }

      if (showChild(column)) {
        if (!column.children?.type) {
          return
        }
        const childTag = components[column.children?.type]
        children = column.children?.options?.map((child: any) => {
          const childAttrs = bindChildAttr(column, child)
          const childSlot = slots[child.slot]
          return <childTag {...getChildItemAttr({ ...childAttrs, ...child }, childTag)}>{
            child.slot && childSlot instanceof Function ? childSlot() : (childAttrs.text || child.label || '')
          }</childTag>
        })
      }
      return <tag {...columnAttrs} v-model={attrs.model[column.prop]} key={column.prop} onChange={column?.attrs?.changeAction} onUpdate={column?.attrs?.updateAction}>{children}</tag>
    }

    // 表单项渲染
    const renderFormItem = (column: FormColumn) => {
      // 处理隐藏
      if (handleHidden(column.hidden)) {
        return
      }
      // 处理 插槽/表单项插槽/表单项组件/普通组件/布局等
      if (column.columnType === 4 && column.parentSlot) {
        // 处理插槽
        const slot = slots[column.parentSlot]
        return slot instanceof Function ? slot({ row: attrs.model, column }) : ''
      } else if (column.columnType === 3) {
        // 处理布局
        const layout = components[column.type]
        const columnAttrs = { ...getTagAttr(column.attrs) }
        // Row/Col-参数: 参考element-plus
        // Flex-参数: direction、justifyContent、alignItems、flexWrap、...flex相关的其他样式参数
        // Grid-参数: ...
        if (['z-row', 'z-col', 'z-flex', 'z-grid'].includes(column.type)) {
          return <layout {...columnAttrs} key={column.prop}>
            {column.children?.options?.map((childColumn) => {
              return renderFormItem(childColumn)
            })}
          </layout>
        } else if (['z-tabs'].includes(column.type)) {
          // Tab-参数: tabs[{ name, label}]、modelValue、其余参数参考element-plus...
          // Tab-Pane参数: 参考element-plus
          return <layout tabs={column.children?.options} {...columnAttrs} onUpdate={column?.attrs?.updateAction}>
            {column.children?.options?.map((childTab)=>{
              <template key={childTab.name} v-slot:default={childTab.name}>
                <div>
                  {childTab.children?.options?.map((childColumn)=>{
                    return renderFormItem(childColumn)
                  })}
                </div>
              </template>
            })}
          </layout>
        }
      } else if (column.columnType === 2) {
        // 处理普通组件
        return renderComponent(column)
      } else if (column.columnType === 1) {
        // 处理表单项
        let component
        if (column.slot) {
          const slot = slots[column.slot]
          component = slot instanceof Function ? slot({ row: attrs.model, column }) : ''
        } else if (column.type) {
          component = renderComponent(column)
        }
        return <ElFormItem {...getFormItemAttr(column)} key={column.prop}> {component} </ElFormItem>
      } else {
        // ...
        return ''
      }
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
          return renderFormItem(column)
        })}
      </ElForm>
    }

  }
})