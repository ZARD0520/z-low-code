<template>
  <div>
    <ant-button>123</ant-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';

export default defineComponent({
  name: 'z-test',
  components: {
    'ant-button': Button
  }
})
</script>