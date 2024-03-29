import { createApp, App as TApp, Component } from 'vue'
import { Spin, Avatar, Rate } from '@arco-design/web-vue'
import { createAPI } from '../src/index'

import App from './App.vue'
import Loading from './Loading.vue'
import Modal from './Modal.vue'

import 'uno.css'
import '@arco-design/web-vue/dist/arco.css'
import './style.css'

const app = createApp(App)

createComponents(app, [Spin, Avatar, Rate, Modal])

app.mount('#app')

function createComponents(app: TApp, comps: Component[], single = true) {
  comps.forEach((c) => {
    createAPI(app, c, single)
  })
}