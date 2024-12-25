<template>
  <el-dialog :model-value="show" :title="title" v-bind="$attrs" width="48%" center :before-close="handleClose">
    <slot></slot>
    <template #footer>
      <slot v-if="customFooter" name="footer"></slot>
      <div v-else class="dialog-footer">
        <el-button @click="handleClose" :loading="buttonLoading()">取 消</el-button>
        <el-button type="primary" @click="handleConfirm" :loading="buttonLoading()">确
          定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue'

export default defineComponent({
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    title: {
      type: String as PropType<string>,
      default: '新增'
    },
    customFooter: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    buttonLoading: {
      type: Function as PropType<Function>,
      default: () => false
    }
  },
  emits:['cancel','reset','confirm'],
  setup(props, { emit }) {
    watch(() => props.show, (value) => {
      if (value) {
        resetForm()
      }
    })

    const resetForm = () => {
      emit('reset')
    }

    const handleConfirm = () => {
      emit('confirm')
    }

    const handleClose = () => {
      resetForm()
      emit('cancel')
    }

    return {
      handleConfirm,
      handleClose
    }
  }
})


</script>

<style lang='scss' scoped>
:deep(.el-form-item__content) {
  display: flex !important;
}
</style>
