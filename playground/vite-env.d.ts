/// <reference types="vite/client" />

declare module 'vue' {
  import { VNode, h, ComponentPublicInstance } from 'vue'

  interface CreateHandler {
    $updateProps: (options?: Record<string, any>, slots?: null | ((createVnode: typeof h) => Record<string, VNode>)) => void
    $remove: () => void
  }

  interface ComponentCustomProperties {
    $createLoading: (options?: Record<string, any>, slots?: null | ((createVnode: typeof h) => Record<string, VNode>)) => ComponentPublicInstance<{}, {}, {}, {}, {
      show: () => void
    } & CreateHandler>
    $createSpin: (options?: Record<string, any>, slots?: null | ((createVnode: typeof h) => Record<string, VNode>)) => ComponentPublicInstance<{}, {}, {}, {}, CreateHandler>
  }
}

export {}
