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
    const year = new Date().getFullYear()

    return {
      isShow,
      year,
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
          class: '!fixed top-50px left-1/2 -translate-x-1/2',
        },
        (h) => ({
          default: () => h(IconUser),
        })
      )

      // bind appContext with this, this is not necessary
      const rate = Rate.$create.call(
        this,
        {
          class: 'fixed top-180px left-1/2 -translate-x-1/2',
          defaultValue: 4,
          readonly: true,
        },
        null
      )

      setTimeout(() => {
        rate.$updateProps({
          modelValue: 3,
        })
        spin.$updateProps({
          tip: '$updateProps check',
        })
        avatar.$updateProps({}, (h) => ({
          default: () => 'B',
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
  <div class="max-w-7xl min-w-screen min-h-screen lg:px-10 lt-lg:px-8">
    <div class="lg:px-5 lg:pt-6">
      <h2><span>Vue create Component</span></h2>
      <p class="text-sm">create component with API</p>
      <p class="flex gap-4 flex-col items-start">
        <button class="animate-shake-x" @click="show">show</button>
        <button @click="showModal">show Modal</button>
        <button @click="isShow = !isShow">{{ isShow ? 'hide' : 'show' }} nest</button>
        <NestVue v-if="isShow" />
      </p>
    </div>
  </div>
  <div class="fixed bottom-8 left-1/2 -translate-x-1/2 text-gray-400">
    Create by zz @{{year}}
  </div>
</template>

<style scoped>
span {
  font-size: 24px;
  font-weight: bold;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h2,
p {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
