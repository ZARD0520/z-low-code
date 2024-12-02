<template>
  <div>
    <el-table ref="tableRef" v-bind="$attrs" :data="data" v-loading="loading">
      <!-- col config -->
      <template v-for="col in columnsProps" :key="col.name">
        <!-- if col has not children -->
        <el-table-column v-if="!col.children" v-bind="col" :selectable="selectable">
          <!-- col header slot -->
          <template v-if="$slots[`${col.prop}Header`]" #header>
            <slot :name="`${col.prop}Header`" />
          </template>
          <!-- col default slot -->
          <template v-if="$slots[col.prop]" #default="{ row, $index }">
            <!-- col options config -->
            <template v-if="col.prop === 'operation'">
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
            <slot v-else-if="col.prop && col.custom" :name="col.prop" :row="row" :index="$index" :col="col"></slot>
            <span v-else>{{ row[col.prop] }}</span>
          </template>
          <!-- col default show -->
          <template v-else-if="col.prop && col.prop !== 'index'" #default="{ row }">
            <span>{{ row[col.prop] }}</span>
          </template>
        </el-table-column>
        <!-- else if col has children  -->
        <el-table-column v-else v-bind="omit({ ...col }, ['children'])" :selectable="selectable">
          <!-- col header config -->
          <template v-if="$slots[`${col.prop}Header`]" #header>
            <slot :name="`${col.prop}Header`" />
          </template>
          <!-- col children config -->
          <template v-for="(column, i) in col.children" :key="i">
            <el-table-column v-if="column.children" v-bind="omit({ ...column }, ['children'])" :selectable="selectable">
              <!-- column header config -->
              <template v-if="$slots[`${col.prop}Header`]" #header>
                <slot :name="`${column.prop}Header`" />
              </template>
              <!-- column children config -->
              <template v-for="(c, i) in column.children" :key="i">
                <el-table-column v-bind="c" :selectable="selectable">
                  <!-- c header config -->
                  <template v-if="$slots[`${col.prop}Header`]" #header>
                    <slot :name="`${c.prop}Header`" />
                  </template>
                  <!-- c default config -->
                  <template v-if="$slots[c.prop]" #default="{ row, $index }">
                    <!-- col options config -->
                    <template v-if="col.prop === 'operation'">
                      <template v-for="(item, index) in columnOptions" :key="index">
                        <template v-if="!item?.hidden(data)">
                          <!-- type is button -->
                          <el-button v-if="item.type === 'z-button'" :disabled="item?.disabled && item.disabled(data)"
                            v-bind="item.attrs" @click="item.action && item.action(data)">
                            {{ typeof item.label === 'function' ? item.label(data) : item.label }}
                          </el-button>
                          <!-- type is slot -->
                          <slot v-else-if="item.type === 'slot'" :name="`bodyCell-operation-${index}`" :data="data">
                          </slot>
                          <!-- type is other -->
                        </template>
                      </template>
                    </template>
                    <slot v-else-if="c.prop && c.custom" :name="c.prop" :row="row" :index="$index"></slot>
                    <span v-else>{{ row[c.prop] }}</span>
                  </template>
                </el-table-column>
              </template>
            </el-table-column>
            <!-- column has not children config -->
            <el-table-column v-else v-bind="column" :selectable="selectable">
              <!-- column header config -->
              <template v-if="$slots[`${col.prop}Header`]" #header>
                <slot :name="`${column.prop}Header`" />
              </template>
              <!-- column default config -->
              <template v-if="$slots[column.prop]" #default="{ row, $index }">
                <!-- col options config -->
                <template v-if="col.prop === 'operation'">
                  <template v-for="(item, index) in columnOptions" :key="index">
                    <template v-if="!item?.hidden(data)">
                      <!-- type is button -->
                      <el-button v-if="item.type === 'z-button'" :disabled="item?.disabled && item.disabled(data)"
                        v-bind="item.attrs" @click="item.action && item.action(data)">
                        {{ typeof item.label === 'function' ? item.label(data) : item.label }}
                      </el-button>
                      <!-- type is slot -->
                      <slot v-else-if="item.type === 'slot'" :name="`bodyCell-operation-${index}`" :data="data">
                      </slot>
                      <!-- type is other -->
                    </template>
                  </template>
                </template>
                <slot v-else-if="column.prop && column.custom" :name="column.prop" :row="row" :index="$index"></slot>
                <span v-else>{{ row[column.prop] }}</span>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </template>
      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
    </el-table>
    <pagination :pageInfo="pagination" @change="handlePageChange"></pagination>
  </div>
</template>

<script lang="ts">
import { cloneDeep, omit } from 'lodash'
import { ref, defineComponent, PropType, toRefs, reactive, computed } from 'vue'
import { usePagination } from '@/hooks/usePagination'
import { apiType, columnOptionType, PageInfoType } from '@/type'
import { ElTable, ElTableColumn } from 'element-plus'
import Pagination from '@/Pagination/index.vue'

interface tableState {
  columnsProps: any[]
}

export default defineComponent({
  name: 'z-table',
  components: {
    ElTable,
    ElTableColumn,
    Pagination
  },
  props: {
    // col config
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    // table list api
    api: {
      type: Object as PropType<apiType>,
      required: true
    },
    // col options config
    columnOptions: {
      type: Array as PropType<columnOptionType[]>,
      default: () => []
    },
    // col is selectable ?
    selectable: {
      type: Function as PropType<(row: any, index: number) => boolean>,
      default: (row: any, index: any) => false
    }
  },
  setup(props, { slots, expose }) {
    const tableRef = ref()

    const state = reactive<tableState>({
      columnsProps: cloneDeep(props.columns) ?? []
    })

    // 分页hooks
    const { current, size, total, data, loading, actionFn } = usePagination({
      api: props.api
    })

    // 根据分页hooks的数据生成分页对象
    const pagination = computed(() => ({
      total,
      current,
      size,
    }))

    // table的change事件
    const handlePageChange: Function = (info: PageInfoType) => {
      if (!info.current || !info.size) {
        console.error('can not find current or pageSize')
        return
      }
      actionFn({
        current: info.current,
        size: info.size
      })
    }

    // 列表请求
    const getList = async () => {
      await actionFn({ current, size })
    }

    // 向外暴露方法
    expose({
      getList
    })

    return {
      ...toRefs(state),
      handlePageChange,
      tableRef,
      pagination,
      data,
      loading,
      omit
    }
  }
})
</script>
