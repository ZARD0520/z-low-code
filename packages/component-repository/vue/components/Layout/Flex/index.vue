<template>
  <div class="flex-container" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'z-flex',
  props: {
    direction: {
      type: String,
      default: 'row'
    },
    justifyContent: {
      type: String,
      default: 'flex-start'
    },
    alignItems: {
      type: String,
      default: 'stretch'
    },
    flexWrap: {
      type: String,
      default: 'wrap'
    }
  },
  setup(props, { attrs }) {
    const styles: any = computed(() => {
      return {
        flexDirection: props.direction,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
        flexWrap: props.flexWrap,
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
.flex-container {
  width: 100%;
  display: flex;
}
</style>