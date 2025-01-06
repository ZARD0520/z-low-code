<template>
  <!-- Row/Col/Flex/Grid -->
  <template v-if="[11, 12, 13, 14].includes(column.type)">
    <component :is="layoutComponent" :key="column.prop" v-bind="columnAttrs">
      <!-- 普通表单项 -->
      <z-form-item v-for="childColumn in column.children?.options" :key="childColumn.prop" :column="childColumn"
        :model="model"></z-form-item>
    </component>
  </template>
  <!-- Tab -->
  <template v-else-if="[15].includes(column.type)">
    <component :is="layoutComponent" :key="column.prop" v-bind="columnAttrs" :tabs="column.children?.options"
      @update="column.actions?.updateAction">
      <!-- TabPane -->
      <template v-for="childTab in column.children?.options" :key="childTab.name" v-slot:['childTab.name']>
        <z-form-item v-for="childColumn in childTab.children?.options" :key="childColumn.prop" :column="childColumn"
          :model="model"></z-form-item>
      </template>
    </component>
  </template>
</template>

<script lang="ts">
import { components } from '../index'
import { FormColumn } from "@/type/form"
import { defineComponent, PropType } from "vue"
import zFormItem from './form-item.vue' // 循环调用导致报错
import { getTagAttr } from '../utils'

export default defineComponent({
  name: 'z-layout-item',
  components: {
    // zFormItem
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
  setup(props) {
    const layoutComponent = components[props.column.type]
    const columnAttrs = { ...getTagAttr(props.column.attrs) }
    return {
      components,
      columnAttrs,
      layoutComponent
    }
  }
})
</script>
