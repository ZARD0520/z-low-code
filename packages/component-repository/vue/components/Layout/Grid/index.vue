<template>
  <div class="grid-layout" :styles="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'z-grid',
  props: {
    gridColumns: {
      type: String,
      default: 'auto auto'
    },
    gridRows: {
      type: String,
      default: 'auto'
    },
    gridGap: {
      type: Number,
      default: 10
    }
  },
  setup(props, { attrs }) {
    const styles = computed(() => {
      return {
        gridTemplateColumns: props.gridColumns,
        gridTemplateRows: props.gridRows,
        gap: props.gridGap + 'px',
        ...attrs
      }
    })
    return {
      styles
    }
  }
})
</script>

<style scoped>
.grid-layout {
  display: grid;
}
</style>