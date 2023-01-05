<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'
import { ref } from 'vue'

withDefaults(
  defineProps<{
    title?: string | number
  }>(),
  {
    title: 'Modal Title',
  }
)

const visible = ref(false)

const show = () => {
  visible.value = true
}
const handleOk = () => {
  console.log('confirm')
  hide()
}
const hide = () => {
  visible.value = false
}

defineExpose({
  show,
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Modal',
})
</script>

<template>
  <Modal v-model:visible="visible" @ok="handleOk" @cancel="hide">
    <template #title> {{ title }} </template>
    <div>
      <slot />
    </div>
  </Modal>
</template>
