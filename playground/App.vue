<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue'

export default defineComponent({
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
        style: "position: fixed; top: 100px; left: 50%; transform: translateX(-50%);"
      })
      
      setTimeout(() => {
        spin.$remove()
      }, 3500)
    }
  }
})
</script>

<template>
  <h2>Vue create Component</h2>
  <p>create component with API</p>
  <p style="padding-bottom: 200px;">
    <button @click="show">show</button>
  </p>
</template>

<style scoped>
h2 {
  color: #4fc08d;
}

h2, p {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
