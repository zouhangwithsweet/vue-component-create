import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Markdown from 'vite-plugin-vue-markdown'
import prism from 'markdown-it-prism'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({include: [/\.vue$/, /\.md$/],}),
    Unocss({}),
    Markdown({
      markdownItUses: [
        prism,
      ],
    })
  ],
  root: 'playground',
})
