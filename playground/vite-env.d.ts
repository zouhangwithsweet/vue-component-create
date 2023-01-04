/// <reference types="vite/client" />

declare module 'vue' {
  import { VNode, h, ComponentPublicInstance } from 'vue'

  interface ComponentCustomProperties {
    $createLoading: (options?: Record<string, any>, slots?: null | ((createVnode: typeof h) => Record<string, VNode>)) => ComponentPublicInstance<{}, {}, {}, {}, {
      show: () => void
    }>
    $createSpin: (options?: Record<string, any>, slots?: null | ((createVnode: typeof h) => Record<string, VNode>)) => ComponentPublicInstance<{}, {}, {}, {}>
    $updateProps: (options?: Record<string, any>, slots?: null | ((createVnode: typeof h) => Record<string, VNode>)) => void
    $remove: () => void
  }
}

export {}
