import { PaginationActionType, PaginationParamsType } from "../type";
import { reactive } from "vue";

export function usePagination(params: PaginationParamsType) {
  try {
    const state = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      data: [],
      filters: {},
      sorter: {}
    })

    const actionFn = async (actionParams: PaginationActionType) => {
      if (!params.api) {
        return
      }
      state.loading = true
      try {
        const result = await params.api.get(actionParams.current, actionParams.pageSize, { ...params.api.params, ...actionParams.filters, ...actionParams.sorter })
        if (result) {
          const { data, total } = result
          // 更新响应式数据
          state.current = actionParams.current
          state.pageSize = actionParams.pageSize
          state.filters = actionParams.filters
          state.sorter = actionParams.sorter
          state.total = total
          state.data = data
        }
      } catch (e) {
        console.error(e)
        throw e
      } finally {
        state.loading = false
      }
    }

    return {
      current: state.current,
      pageSize: state.pageSize,
      total: state.total,
      data: state.data,
      loading: state.loading,
      filters: state.filters,
      sorter: state.sorter,
      actionFn
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}