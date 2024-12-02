<template>
  <div>
    <el-button type="primary">123</el-button>
  </div>
</template>

<script lang="ts">
import { ElButton } from 'element-plus';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'z-test',
  components: {
    ElButton
  }
})
</script>