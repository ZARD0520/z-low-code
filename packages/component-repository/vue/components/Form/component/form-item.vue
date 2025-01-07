<template>
  <template v-if="!handleHidden(column.hidden, model)"></template>
  <!-- 普通表单项 -->
  <el-form-item v-if="column.columnType === 1" v-bind="getFormItemAttr(column)" :key="column.prop">
    <!-- 表单项内插槽 -->
    <slot v-if="column.slot" :name="column.slot" :data="{ row: model, column }"></slot>
    <!-- 表单项内组件 -->
    <z-component-item v-else :column="column" :model="model"></z-component-item>
  </el-form-item>
  <!-- 普通组件项 -->
  <z-component-item v-else-if="column.columnType === 2" :column="column" :model="model"></z-component-item>
  <!-- 布局项 -->
  <Suspense v-else-if="column.columnType === 3">
    <template #default>
      <z-layout-item :column="column" :model="model"></z-layout-item>
    </template>
    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
  <!-- 插槽 -->
  <slot v-else-if="column.columnType === 4 && column.parentSlot" :name="column.parentSlot"
    :data="{ row: model, column }">
  </slot>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, PropType } from "vue"
import { ElFormItem } from "element-plus"
import { FormColumn } from "@/type/form"
import { getFormItemAttr, handleHidden } from "../utils"
import { components } from "../componentsMap"
import zComponentItem from "./component-item.vue"

export default defineComponent({
  name: 'z-form-item',
  components: {
    ElFormItem,
    zComponentItem
  },
  props: {
    column: {
      type: Object as PropType<FormColumn>,
      required: true
    },
    model: {
      type: Object as PropType<Object>,
      required: true
    }
  },
  setup() {
    const zLayoutItem = defineAsyncComponent(() => import('./layout-item.vue'))
    return {
      getFormItemAttr,
      handleHidden,
      components,
      zLayoutItem
    }
  }
})
</script>