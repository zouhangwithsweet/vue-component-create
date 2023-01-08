<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Rate } from '@arco-design/web-vue'
import { IconUser } from '@arco-design/web-vue/es/icon'
import NestVue from './Nest.vue'

import type { ModalConfig } from '@arco-design/web-vue'

export default defineComponent({
  components: {
    NestVue,
  },
  setup() {
    const isShow = ref(false)

    return {
      isShow,
    }
  },
  methods: {
    show() {
      const spin = this.$createSpin({
        tip: 'Loading message...',
        style: 'position: fixed; top: 100px; left: 50%; transform: translateX(-50%);',
      })
      const avatar = this.$createAvatar(
        {
          style: 'position: fixed; top: 50px; left: 50%; transform: translateX(-50%);',
        },
        (h) => ({
          default: () => h(IconUser),
        })
      )

      // bind appContext with this, this is not necessary
      const rate = Rate.$create.call(this, {
        style: 'position: fixed; top: 180px; left: 50%; transform: translateX(-50%);',
        defaultValue: 4,
        readonly: true,
      }, null)

      setTimeout(() => {
        rate.$updateProps({
          modelValue: 3,
        })
        spin.$updateProps({
          tip: '$updateProps check'
        })
        avatar.$updateProps({}, (h) => ({
          default: () => 'B'
        }))
      }, 1500)

      setTimeout(() => {
        spin.$remove()
        avatar.$remove()
        rate.$remove()
      }, 3500)
    },
    showModal() {
      const modal = this.$createModal<Omit<ModalConfig, 'content'>>({}, (h) => ({
        default:
          () => `You can customize modal body text by the current situation. This modal will be closed immediately once you press
        the OK button.`,
      }))
      modal.show()
    },
  },
})
</script>

<template>
  <h2>Vue create Component</h2>
  <p>create component with API</p>
  <p style="display: flex; gap: 16px; flex-direction: column; align-items: center">
    <button @click="show">show</button>
    <button @click="showModal">show Modal</button>
    <button @click="isShow = !isShow">{{ isShow ? 'hide' : 'show' }} nest</button>
    <NestVue v-if="isShow" />
  </p>
</template>

<style scoped>
h2 {
  color: #4fc08d;
}

h2,
p {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
