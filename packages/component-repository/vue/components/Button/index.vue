<template>
  <ant-button v-bind="$attrs">
    <slot></slot>
  </ant-button>
</template>

<script>
import { defineComponent } from 'vue'
import { Button as AntButton } from 'ant-design-vue'

export default defineComponent({
  name:'z-button',
  components: {
    AntButton
  }
})
</script>