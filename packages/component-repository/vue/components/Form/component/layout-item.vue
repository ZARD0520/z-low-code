<template>
  <!-- Row/Col/Flex/Grid -->
  <template v-if="[11, 12, 13, 14].includes(column.type)">
    <component :is="layoutComponent" :key="column.prop" v-bind="columnAttrs">
      <Suspense>
        <template #default>
          <z-form-item v-for="childColumn in column.children?.options" :key="childColumn.prop" :column="childColumn"
            :model="model"></z-form-item>
        </template>
        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </component>
  </template>
  <!-- Tab -->
  <template v-else-if="[15].includes(column.type)">
    <component :is="layoutComponent" :key="column.prop" v-bind="columnAttrs" :tabs="column.children?.options"
      @update="column.actions?.updateAction">
      <template v-for="childTab in column.children?.options" :key="childTab.name" v-slot:childTab.name>
        <Suspense>
          <template #default>
            <z-form-item v-for="childColumn in childTab.children?.options" :key="childColumn.prop" :column="childColumn"
              :model="model"></z-form-item>
          </template>
          <template #fallback>
            <span>Loading...</span>
          </template>
        </Suspense>
      </template>
    </component>
  </template>
</template>

<script lang="ts">
import { components } from '../componentsMap'
import { FormColumn } from "@/type/form"
import { defineComponent, PropType } from "vue"
import { getTagAttr } from '../utils'

export default defineComponent({
  name: 'z-layout-item',
  components: {
    zFormItem: () => import('./form-item.vue')
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
