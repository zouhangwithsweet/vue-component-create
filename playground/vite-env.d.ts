/// <reference types="vite/client" />

declare module 'vue' {
  import { VNode, h, ComponentPublicInstance, VNodeChild } from 'vue'

  type SlotsData = (createVnode: typeof h) => Record<string, () => VNodeChild>

  interface CreateHandler {
    $updateProps: (options?: Record<string, any>, slots?: null | SlotsData) => void
    $remove: () => void
  }

  interface ComponentCustomProperties {
    $createLoading: (options?: Record<string, any>, slots?: null | SlotsData) => ComponentPublicInstance<{}, {}, {}, {}, {
      show: () => void
    } & CreateHandler>
    $createSpin: (options?: Record<string, any>, slots?: null | SlotsData) => ComponentPublicInstance<{}, {}, {}, {}, CreateHandler>
    $createAvatar: (options?: Record<string, any>, slots?: null | SlotsData) => ComponentPublicInstance<{}, {}, {}, {}, CreateHandler>
    $createRate: (options?: Record<string, any>, slots?: null | SlotsData) => ComponentPublicInstance<{}, {}, {}, {}, CreateHandler>
    $createModal: <P = {}>(options?: P, slots?: null | SlotsData) => ComponentPublicInstance<{}, {}, {}, {}, CreateHandler & {
      show: () => void
      hide: () => void
    }>
  }
}

export {}
