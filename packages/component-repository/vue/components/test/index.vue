<template>
  <div>
    <ant-button>123</ant-button>
    <ant-float-button>top</ant-float-button>
    <ant-water-mark content="silly b long mao">
      <div style="height: 500px">
        <ant-input />
      </div>
    </ant-water-mark>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button, FloatButton, Watermark, Input } from 'ant-design-vue';

export default defineComponent({
  name: 'z-test',
  components: {
    'ant-button': Button,
    'ant-float-button': FloatButton,
    'ant-water-mark': Watermark,
    'ant-input': Input
  }
})
</script>