<script lang="ts">
import { Modal } from '@arco-design/web-vue'
import { ref } from 'vue'

export default {
  name: 'Modal',
  components: {
    'a-modal': Modal
  },
  setup() {
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

    return {
      visible,
      show,
      handleOk,
      hide,
    }
  },
}
</script>

<template>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="hide">
    <template #title> Title </template>
    <div>
      You can customize modal body text by the current situation. This modal will be closed immediately once you press
      the OK button.
    </div>
  </a-modal>
</template>
