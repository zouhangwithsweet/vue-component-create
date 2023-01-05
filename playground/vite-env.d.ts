/// <reference types="vite/client" />

declare module 'vue' {
  import { VNode, h, ComponentPublicInstance } from 'vue'

  interface CreateHandler {
    $updateProps: (options?: Record<string, any>, slots?: null | ((createVnode: typeof h) => Record<string, () => VNode>)) => void
    $remove: () => void
  }

  interface ComponentCustomProperties {
    $createLoading: (options?: Record<string, any>, slots?: null | ((createVnode: typeof h) => Record<string, () => VNode>)) => ComponentPublicInstance<{}, {}, {}, {}, {
      show: () => void
    } & CreateHandler>
    $createSpin: (options?: Record<string, any>, slots?: null | ((createVnode: typeof h) => Record<string, () => VNode>)) => ComponentPublicInstance<{}, {}, {}, {}, CreateHandler>
    $createAvatar: (options?: Record<string, any>, slots?: null | ((createVnode: typeof h) => Record<string, () => VNode>)) => ComponentPublicInstance<{}, {}, {}, {}, CreateHandler>
    $createRate: (options?: Record<string, any>, slots?: null | ((createVnode: typeof h) => Record<string, () => VNode>)) => ComponentPublicInstance<{}, {}, {}, {}, CreateHandler>
    $createModal: (options?: Record<string, any>, slots?: null | ((createVnode: typeof h) => Record<string, () => VNode>)) => ComponentPublicInstance<{}, {}, {}, {}, CreateHandler & {
      show: () => void
      hide: () => void
    }>
  }
}

export {}
