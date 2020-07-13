import * as vue from 'vue'

declare module 'vue' {
  export const render: vue.RootRenderFunction<Element | DocumentFragment>
}


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $createLoading: () => any
  }
}
