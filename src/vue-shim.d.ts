import * as vue from 'vue'

declare module 'vue' {
  export const render: vue.RootRenderFunction<Element | DocumentFragment>
}