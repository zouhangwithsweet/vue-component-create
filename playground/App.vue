<template>
  <h1>Vue create Component</h1>
  <p>create component with API</p>
  <p>
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
      const loading = this.$createLoading()
      console.log(loading)
      loading.show()

      setTimeout(() => {
        loading.$updateProps({
          msg: '测试message',
        })
      }, 1000)

      setTimeout(() => {
        loading.remove()
      }, 5000)
    }
  }
})
</script>

<style scoped>
h1 {
  color: #4fc08d;
}

h1, p {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
