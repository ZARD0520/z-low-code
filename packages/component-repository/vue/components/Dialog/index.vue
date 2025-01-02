<template>
  <el-dialog :model-value="modelValue" :title="title" v-bind="$attrs" width="48%" center :before-close="handleClose">
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
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '新增'
    },
    customFooter: {
      type: Boolean,
      default: false
    },
    buttonLoading: {
      type: Function,
      default: () => (() => false)
    }
  },
  emits:['update:modelValue','cancel','reset','confirm'],
  setup(props, { emit }) {
    watch(() => props.modelValue, (value) => {
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
      emit('update:modelValue', false)
    }

    return {
      handleConfirm,
      handleClose
    }
  }
})


</script>

<style lang='scss' scoped>
::v-deep(.el-form-item__content) {
  display: flex !important;
}
</style>
