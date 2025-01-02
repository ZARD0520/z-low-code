<template>
  <div ref="chartRef" :style="chartStyle" v-loading="chartLoading"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch, nextTick, PropType } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'z-charts',
  props: {
    options: {
      type: Object as PropType<echarts.EChartsOption>,
      default: () => ({}),
    },
    chartStyle: {
      type: Object,
      default: () => ({ height: '400px', width: '100%' })
    }
    // and so on...
  },
  setup(props) {
    const chartRef = ref<HTMLElement | null>(null)
    const chartLoading = ref(false)
    let chartInstance: echarts.ECharts

    const initChart = () => {
      if (chartRef.value !== null) {
        chartLoading.value = true
        chartInstance = echarts.init(chartRef.value)
        chartInstance.setOption(props.options)
        chartLoading.value = false
      }
    };

    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize()
      }
    };

    onMounted(() => {
      initChart()
      window.addEventListener('resize', resizeChart)
    });

    onUnmounted(() => {
      window.removeEventListener('resize', resizeChart)
      if (chartInstance) {
        chartInstance.dispose()
      }
    });

    watch(() => props.options, (newOptions: echarts.EChartsOption) => {
      if (chartInstance) {
        chartLoading.value = true
        nextTick(() => {
          chartInstance.setOption(newOptions)
          chartLoading.value = false
        })
      }
    }, { deep: true })

    return {
      chartLoading
    }
  }
})
</script>