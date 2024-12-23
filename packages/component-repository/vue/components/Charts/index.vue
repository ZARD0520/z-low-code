<template>
  <div ref="chartRef" :style="chartStyle"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'z-charts',
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
    chartStyle: {
      type: Object,
      default: () => ({ height: '400px', width: '100%' })
    }
    // and so on...
  },
  setup(props) {
    const chartRef = ref(null)
    let chartInstance = null

    const initChart = () => {
      if (chartRef.value !== null) {
        chartInstance = echarts.init(chartRef.value)
        chartInstance.setOption(props.options)
      }
    };

    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize()
      }
    };

    onMounted(() => {
      initChart();
      window.addEventListener('resize', resizeChart)
    });

    onUnmounted(() => {
      window.removeEventListener('resize', resizeChart)
      if (chartInstance) {
        chartInstance.dispose()
      }
    });

    watch(() => props.options, () => {
      nextTick(() => {
        if (chartInstance) {
          chartInstance.setOption(props.options)
        }
      });
    })
  }
})
</script>