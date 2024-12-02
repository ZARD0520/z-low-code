<template>
  <el-pagination class="pagination" background :layout="layout"
    :page-sizes="pageSizes" :current-page="pageInfo.current" :page-size="pageInfo.size || 10" :total="pageInfo.total"
    :page-count="pageInfo.count"
    v-bind="$attrs" @size-change="handleSizeChange" @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script lang="ts">
import { PageInfoType } from '@/type';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'z-pagination',
  components: {},
  props: {
    pageInfo: {
      type: Object as PropType<PageInfoType>,
      required: true
    },
    layout: {
      type: String as PropType<string>,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageSizes: {
      type: Array as PropType<Array<number>>,
      default: () => {
        return [5, 10, 20, 30, 40, 50, 100, 500, 1000]
      }
    }
  },
  emits: [
    'change'
  ],
  setup(props, { emit }) {
    const handleSizeChange = (size: number) => {
      emit('change', { ...props.pageInfo, size })
    }
    const handleCurrentChange = (current: number) => {
      emit('change', { ...props.pageInfo, current })
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