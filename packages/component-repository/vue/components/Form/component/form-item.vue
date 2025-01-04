<template>
  <!-- 普通表单项 -->
  <el-form-item v-if="column.columnType === 1 && !handleHidden(column.hidden, model)" v-bind="getFormItemAttr(column)" :key="column.prop">
    <!-- 表单项内插槽 -->
    <slot v-if="column.slot" :name="column.slot" :data="{ row: model, column }"></slot>
    <!-- 表单项内组件 -->
    <div v-else :column="column"></div>
  </el-form-item>
  <!-- 普通组件项 -->
  <div v-else-if="column.columnType === 2" :column="column"></div>
  <!-- 布局项 -->
  <template v-else-if="column.columnType === 3">
    <!-- Row/Col/Flex/Grid -->
    <component v-if="[11,12,13,14].includes(column.type)" :is="components[column.type]">
      <!-- 普通表单项 -->
      <div v-for="childColumn in column.children?.options" :key="childColumn.prop"></div>
    </component>
    <!-- Tab -->
    <component v-else-if="[15].includes(column.type)" :is="components[column.type]">
      <!-- TabPane -->
    </component>
  </template>
  <!-- 插槽 -->
  <slot v-else-if="column.columnType === 4 && column.parentSlot" :name="column.parentSlot" :data="{ row: model, column }"></slot>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ElFormItem } from 'element-plus'
import { FormColumn } from "@/type/form"
import { getFormItemAttr, handleHidden } from "../utils"
import { components } from "../index"

export default defineComponent({
  name: 'z-form-item',
  components: {
    ElFormItem
  },
  props: {
    column:{
      type: Object as PropType<FormColumn>,
      required: true
    },
    model:{
      type: Object as PropType<Object>,
      required: true
    }
  },
  setup(){
    return {
      getFormItemAttr,
      handleHidden,
      components
    }
  }
})
</script>