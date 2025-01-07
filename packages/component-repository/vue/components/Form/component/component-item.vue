<template>
  <template v-if="isModelSupported">
    <component :is="parentComponent" :key="column.prop" v-model="model[column.prop]" v-bind="columnAttrs"
      @change="column?.actions?.changeAction" @update="column?.actions?.updateAction">
      <template v-if="isShowChild && childComponent">
        <component :is="childComponent" v-for="child in column.children?.options" :key="child.prop"
          v-bind="getChildItemAttr({ ...bindChildAttr(column, child), ...child }, childComponent)">
          <slot v-if="child.slot" :name="child.slot"></slot>
          <span v-else>{{ bindChildAttr(column, child)?.text || child.label || '' }}</span>
        </component>
      </template>
    </component>
  </template>
  <template v-else>
    <component :is="parentComponent" :key="column.prop" v-bind="columnAttrs" @change="column?.actions?.changeAction"
      @update="column?.actions?.updateAction">
      <template v-if="isShowChild && childComponent">
        <component :is="childComponent" v-for="child in column.children?.options" :key="child.prop"
          v-bind="getChildItemAttr({ ...bindChildAttr(column, child), ...child }, childComponent)">
          <slot v-if="child.slot" :name="child.slot"></slot>
          <span v-else>{{ bindChildAttr(column, child)?.text || child.label || '' }}</span>
        </component>
      </template>
    </component>
  </template>
</template>

<script lang="ts">
import { components } from "../componentsMap"
import { FormColumn } from "@/type/form"
import { computed, defineComponent, PropType, ref } from "vue"
import { bindChildAttr, getChildItemAttr, getTagAttr, handleDisabled, handleRemote, hasModel, showChild } from "../utils";

export default defineComponent({
  name: 'z-component-item',
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
    const parentComponent = components[props.column.type]
    const childComponent: any = ref(null)
    const columnAttrs = { ...getTagAttr(props.column.attrs) }

    handleRemote(props.column, columnAttrs)
    handleDisabled(columnAttrs, props.model)
    const isModelSupported = computed(() => hasModel(parentComponent))
    const isShowChild = computed(() => showChild(props.column))

    if (isShowChild) {
      childComponent.value = components[props.column.children?.type as number]
    }

    return {
      parentComponent,
      components,
      columnAttrs,
      isModelSupported,
      isShowChild,
      childComponent,
      bindChildAttr,
      getChildItemAttr
    }
  }
})
</script>