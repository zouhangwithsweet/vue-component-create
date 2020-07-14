import { createApp } from 'vue'
import { useCreate } from '../src/index'
import App from './App.vue'
import Loading from './Loading.vue'

const app = createApp(App)

app.mount('#app')
useCreate(Loading, app)
