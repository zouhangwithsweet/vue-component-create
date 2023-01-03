import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Loading from './Loading.vue'

import { createAPI } from '../src/index'

const app = createApp(App)

app.mount('#app')

createAPI(app, Loading, true)
