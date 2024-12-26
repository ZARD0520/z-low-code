<template>
  <el-tabs v-model="activeTab" @tab-click="handleTabClick" v-bind="$attrs">
    <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name" v-bind="tab.attrs">
      <slot :name="tab.name"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { ElTabs, ElTabPane } from 'element-plus'
import { defineComponent, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'z-tabs',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    tabs: {
      type: Array as PropType<Array<any>>,
      default: () => []
    }
  },
  components: {
    ElTabs,
    ElTabPane
  },
  setup(props, { emit }) {
    const activeTab = ref(props.modelValue)
    
    watch(
      () => props.modelValue,
      (value) => {
        activeTab.value = value
      }
    )
    
    const handleTabClick = (tab, event) => {
      activeTab.value = tab.name
      emit('update:modelValue', tab.name)
    }

    return {
      activeTab,
      handleTabClick
    }
  }
})
</script>