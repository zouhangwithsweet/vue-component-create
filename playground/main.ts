import { createApp } from 'vue'
import { Spin, Avatar, Rate } from '@arco-design/web-vue'
import { createAPI } from '../src/index'

import App from './App.vue'
import Loading from './Loading.vue'

import '@arco-design/web-vue/dist/arco.css'
import './style.css'

const app = createApp(App)

createAPI(app, Loading, true)
createAPI(app, Spin, true)
createAPI(app, Avatar, true)
createAPI(app, Rate, true)

app.mount('#app')
