import { createApp } from 'vue'
import { useCreate } from '../src/index'
import App from './App.vue'
import Loading from './Loading.vue'

const app = createApp(App)

app.mount('#app')
useCreate(Loading, app, {
  msg: '5555 Fazi',
  onShow() {
    console.log('我是外部传入的监听')
  }
})
