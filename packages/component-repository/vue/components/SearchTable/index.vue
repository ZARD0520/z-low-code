<template>
  <!-- 筛选区 -->
  <div v-if="searchForm.columns?.length">
    <!-- 表单组件 -->
  </div>
  <div class="middle-block"></div>
  <!-- 图表区 -->
  <div v-if="searchCharts.columns?.length">
    <!-- 图表组件 -->
  </div>
  <div class="middle-block"></div>
  <!-- 表格区 -->
  <div v-if="searchTable">
    <div align="middle">
      <!-- 操作行 -->
    </div>
    <!-- 表格组件 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'z-search-table',
  components: {
  },
  props: {
    searchForm: {
      type: Object as PropType<any>
    },
    searchCharts: {
      type: Object as PropType<any>
    },
    searchTable: {
      type: Object as PropType<any>
    }
  }
})
</script>