<template>
  <div>
    <el-table ref="tableRef" v-bind="$attrs" :data-source="data" :columns="columnsProps" :loading="loading"
      :pagination="pagination" @change="handleTableChange">
      <!-- slot config -->
      <template v-for="slot in tableSlots" v-slot:[slot.name]="data" :key="slot.name">
        <slot :name="slot.name" :data="data"></slot>
      </template>
      <!-- slot(bodyCell) config -->
      <template #bodyCell="data">
        <!-- operation column config -->
        <template v-if="data.column.dataIndex === 'operation'">
          <template v-for="(item, index) in columnOptions" :key="index">
            <template v-if="!item?.hidden(data)">
              <!-- type is button -->
              <el-button v-if="item.type === 'z-button'" :disabled="item?.disabled && item.disabled(data)"
                v-bind="item.attrs" @click="item.action && item.action(data)">
                {{ typeof item.label === 'function' ? item.label(data) : item.label }}
              </el-button>
              <!-- type is slot -->
              <slot v-else-if="item.type === 'slot'" :name="`bodyCell-operation-${index}`" :data="data"></slot>
              <!-- type is other -->
            </template>
          </template>
        </template>
        <template v-else>
          <slot name="bodyCell" :data="data"></slot>
        </template>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { cloneDeep, omit } from 'lodash'
import { ref, defineComponent, PropType, toRefs, reactive, computed } from 'vue'
import { usePagination } from '@/hooks/usePagination'
import { apiType, columnOptionType } from '@/type'

interface tableState {
  columnsProps: any[]
}

export default defineComponent({
  name: 'z-table',
  components: {
  },
  props: {
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    api: {
      type: Object as PropType<apiType>,
      required: true
    },
    columnOptions: {
      type: Array as PropType<columnOptionType[]>,
      default: () => []
    }
  },
  setup(props, { slots, expose }) {
    const tableRef = ref()

    const state = reactive<tableState>({
      columnsProps: cloneDeep(props.columns) ?? []
    })

    // 分页hooks
    const { current, pageSize, total, data, loading, filters, sorter, actionFn } = usePagination({
      api: props.api
    })

    // 根据分页hooks的数据生成分页对象
    const pagination = computed(() => ({
      total,
      current,
      pageSize,
    }))

    // table的change事件
    const handleTableChange: any = (tablePagination: any,
      filters: any,
      sorter: any,
      extra: any) => {
      if (!tablePagination.current || !tablePagination.pageSize) {
        console.error('can not find current or pageSize')
        return
      }
      actionFn({
        current: tablePagination.current,
        pageSize: tablePagination.pageSize,
        filters,
        sorter
      })
    }

    // table的Slots
    const tableSlots = computed(() => {
      // 将 $slots 对象转换为数组，并过滤出具名插槽
      return Object.keys(slots)
        .filter(name => slots[name] && name !== 'bodyCell')
        .map(name => ({ name, slot: slots[name] }))
    })

    // 列表请求
    const getList = async () => {
      await actionFn({ current, pageSize, filters, sorter })
    }

    // 向外暴露方法
    expose({
      getList
    })

    return {
      ...toRefs(state),
      handleTableChange,
      tableSlots,
      tableRef,
      pagination,
      data,
      loading
    }
  }
})
</script>
