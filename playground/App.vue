<template>
  <h2>Vue create Component</h2>
  <p>create component with API</p>
  <p style="padding-bottom: 200px;">
    <button @click="show">show</button>
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const isShow = ref(false)
    return {
      isShow,
    }
  },
  methods: {
    show() {
      const loading = (this as any).$createLoading()
      console.log(loading)
      loading.show()

      setTimeout(() => {
        loading.$updateProps({
          msg: '测试message',
        })
      }, 1000)

      setTimeout(() => {
        loading.$remove()
      }, 5000)
    }
  }
})
</script>

<style scoped>
h2 {
  color: #4fc08d;
}

h2, p {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
