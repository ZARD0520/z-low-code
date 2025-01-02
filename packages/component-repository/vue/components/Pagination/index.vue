<template>
  <el-pagination class="pagination" background :layout="layout"
    :page-sizes="pageSizes" :current-page="modelValue.current" :page-size="modelValue.size || 10" :total="modelValue.total"
    :page-count="modelValue.count"
    v-bind="$attrs" @size-change="handleSizeChange" @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script lang="ts">
import { PageInfoType } from '@/type/pagination';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'z-pagination',
  components: {},
  props: {
    modelValue: {
      type: Object as PropType<PageInfoType>,
      required: true
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageSizes: {
      type: Array as PropType<Array<number>>,
      default: () => {
        return [5, 10, 20, 30, 40, 50, 100, 500, 1000]
      }
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleSizeChange = (size: number) => {
      const { current, total, count } = props.modelValue
      emit('update:modelValue', { current, size, total, count })
    }
    const handleCurrentChange = (current: number) => {
      const { size, total, count } = props.modelValue
      emit('update:modelValue', { current, size, total, count })
    }
    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang='scss' scoped>
.pagination {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
}
</style>