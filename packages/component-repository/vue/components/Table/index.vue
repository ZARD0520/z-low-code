<template>
  <div>
    <ant-table ref="tableRef" v-bind="$attrs" :data="columnsData" :columns="columnsProps">
      <!-- header config -->
      <template #headerCell="{ title, column }">
        <template v-if="$slots[`${column.prop}Header`]">
          <slot :name="`${column.prop}Header`" :data="column"></slot>
        </template>
        <template v-else #headerCell>
          {{ title }}
        </template>
      </template>
      <!-- body config -->
      <template #bodyCell="{ column,record}">
        <template v-if="$slots[`${column.prop}Body`]">
          <slot :name="`${column.prop}Header`" :data="{ column, record }"></slot>
        </template>
        <span v-else>{{ record }}</span>
      </template>
    </ant-table>
  </div>
</template>

<script lang="ts">
import { cloneDeep, omit } from 'lodash'
import { Table } from 'ant-design-vue'
import { ColumnsType, ColumnType } from 'ant-design-vue/es/table'
import { ref, defineComponent, PropType, watchEffect, watch, nextTick } from 'vue'

export default defineComponent({
  name: 'z-table',
  components: {
    'ant-table': Table
  },
  props: {
    columns: {
      type: Array as PropType<ColumnsType>,
      default: () => []
    },
    data: {
      type: Array as PropType<any>,
      default: () => []
    }
  },
  setup(props, { slots, expose }) {
    const tableRef = ref()
    const columnsProps = ref<ColumnType[]>([])
    const columnsData = ref<ColumnType[]>(cloneDeep(props.columns) ?? [])

    // 外部列数据联动内部
    watchEffect(() => {
      columnsProps.value = cloneDeep(props.columns) ?? []
    })

    // 数据刷新后，更新用户勾选的数据内容
    watch(() => props.data, () => {
      nextTick(() => {
        if (tableRef.value) {
          const selectionRows = tableRef.value.getSelectionRows() || []
          if (selectionRows.length > 0) {
            selectionRows.map((item: any) => {
              tableRef.value.toggleRowSelection(item, true)
            })
            tableRef.value.$emit('selection-change', [...selectionRows])
          }
        }
      })
    })

    return {
      tableRef,
      columnsProps,
      columnsData
    }
  }
})
</script>
