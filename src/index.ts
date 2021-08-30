import { App, render, mergeProps, createVNode } from 'vue'
import { camelize } from './utils'
import type { Component, VNode } from 'vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    remove?: (callback?: (args?: any) => void) => void
    updateProps?: (args: Record<string, any>) => void
  }
}

let seed = 1

const instances: VNode[] = []

export const createComponent = (
  CompConstructor: Component,
  options: Record<string, any>
) => {
  const container = document.createElement('div')
  const id = 'create_component_' + seed++

  const vm = createVNode(CompConstructor, {
    ...options,
    id,
  })

  vm.props = mergeProps(vm.props || {}, options)

  render(vm, container)
  instances.push(vm)

  /**
   * mounted dom
   */
  document.body.appendChild(container)

  const _this = vm?.component?.exposed || vm?.component?.proxy
  if (_this) {
    /**
     * remove instnace
     */
     ;(_this as any).$remove = (_this as any).remove = function (
      callback?: (args?: any) => void
    ) {
      render(null, container)
      document.body.removeChild(container)
      callback?.()
    }
    /**
     * update props
     */
     ;(_this as any).$updateProps = (_this as any).updateProps = function (
      props: Record<string, any>
    ) {
      props &&
        Object.keys(props).forEach((k) => {
          ;(vm as any).component.props[k] = props[k]
        })
    }
  }

  return vm
}

export function destroy(id: string) {
  const idx = instances.findIndex((vm) => {
    const { id: _id } = vm?.component?.props as any
    return id === _id
  })

  if (idx === -1) {
    return
  }

  const _this = instances[idx]?.component?.exposed || instances[idx]?.component?.proxy

  ;(_this as any).remove()
  instances.splice(idx, 1)
}

export const useCreate = function(Component: Component, app: App, options?: any,) {
  if (!Component.name) {
    throw new Error('The name of the component is necessary')
  }
  if (app) {
    app
      .config
      .globalProperties[`${camelize(`$create-${camelize(Component.name)}`)}`] = function() {
        const vm = createComponent(Component, options)
        return vm.component?.exposed || vm.component?.proxy
      }
  }
}

const install = (app: App) => {
  app.config.globalProperties.$useCreate = useCreate
}

export default install
