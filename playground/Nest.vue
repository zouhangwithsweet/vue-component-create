<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    showModal() {
      const modal = this.$createModal({}, (h) => ({
        default:
          () => `Generate Modal from nest component.`,
      }))
      modal.show()
    },
  }
})
</script>

<template>
  <button @click="showModal">show nest Modal</button>
</template>
