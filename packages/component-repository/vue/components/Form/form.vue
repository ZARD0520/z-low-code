<template>
  <el-form ref="formRef" v-bind="{ ...attrs }">
    <!-- 表单项组件遍历 -->
    <div v-for="column in vFormColumns" :key="column.prop" :column="column" :model="attrs.model"></div>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, useAttrs } from "vue"
import { ElForm } from "element-plus"
import { FormColumn } from "@/type/form"

export default defineComponent({
  name: 'z-form',
  components: {
    ElForm
  },
  props: {
    formColumns: {
      type: Array as PropType<FormColumn[]>,
      default: () => []
    }
  },
  setup(props, { slots, expose }) {
    const formRef = ref()
    const attrs: any = useAttrs()
    const vFormColumns = computed(() => props.formColumns)

    const validateForm = async () => {
      const valid = await formRef?.value?.validateForm()
      return valid
    }

    const checkDataInit = () => {
      const formItems = vFormColumns.value.filter((item: FormColumn) => !item.slot && !item.parentSlot)
      formItems.forEach((item: FormColumn) => {
        if (attrs.model[item.prop] === undefined) {
          console.warn(`推荐在model初始化${item.prop}`)
        }
      })
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

    return {
      formRef,
      attrs,
      vFormColumns
    }
  }
})
</script>