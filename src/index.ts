import { App, createVNode, render, mergeProps, ComponentOptions } from 'vue'
import { camelize } from './utils'

let _instance: any = null
let _flag = false

const createComponet = (Component: ComponentOptions, options?: any) => {
  if (!_instance) {
    const container = document.createDocumentFragment()

    _instance = createVNode(Component)

    _instance.props = mergeProps(_instance.props, options)

    render(_instance, container)
    document.body.appendChild(container)
  
    _instance.component.ctx.remove = function() {
      render(null, container)
      _instance = null
    }
  
    _instance.component.ctx.$updateProps = function(props: any) {
      props && Object.keys(props).forEach(k => {
        _instance.component.props[k] = props[k]
      })
    }
  }

  return _instance.component.ctx
}

export const useCreate = function(Component: ComponentOptions, app: App, options?: any, ) {
  if (!Component.name) {
    throw new Error('The name of the component is necessary')
  }
  if (app) {
    if (_flag) return
    _flag = true
    app
      .config
      .globalProperties[`${camelize(`$create-${camelize(Component.name)}`)}`] = function() {
        if (_instance) {
          return _instance.component.ctx
        } else {
          return createComponet(Component, options)
        }
      }
  }
}

const install = (app: App) => {
  // todo
}
export default install
