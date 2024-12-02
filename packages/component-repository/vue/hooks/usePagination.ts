import { PaginationActionType, PaginationParamsType } from "../type";
import { reactive } from "vue";

export function usePagination(params: PaginationParamsType) {
  try {
    const state = reactive({
      current: 1,
      size: 10,
      total: 0,
      loading: false,
      data: []
    })

    const actionFn = async (actionParams: PaginationActionType) => {
      if (!params.api) {
        return
      }
      state.loading = true
      try {
        const result = await params.api.get(actionParams.current, actionParams.size, { ...params.api.params })
        if (result) {
          const { data, total } = result
          // 更新响应式数据
          state.current = actionParams.current
          state.size = actionParams.size
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
      size: state.size,
      total: state.total,
      data: state.data,
      loading: state.loading,
      actionFn
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}