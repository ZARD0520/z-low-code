<template>
  <!-- 筛选区 -->
  <ant-card v-if="searchForm.columns?.length">
    <!-- 表单组件 -->
  </ant-card>
  <div class="middle-block"></div>
  <!-- 图表区 -->
  <ant-card v-if="searchCharts.columns?.length">
    <!-- 图表组件 -->
  </ant-card>
  <div class="middle-block"></div>
  <!-- 表格区 -->
  <ant-card v-if="searchTable">
    <ant-row align="middle">
      <!-- 操作行 -->
    </ant-row>
    <!-- 表格组件 -->
  </ant-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Card, Row } from 'ant-design-vue';

export default defineComponent({
  name: 'z-search-table',
  components: {
    'ant-card': Card,
    'ant-row': Row
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