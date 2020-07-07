import { App, createVNode, render, mergeProps, ComponentOptions } from 'vue'

let _instance: any = null

export const useCreate = function(Component: ComponentOptions, app?: App, options?: any, ) {
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
  if (app) {
    app.config.globalProperties[`$create${Component.name}`] = useCreate(Component, app)
  }
  return _instance.component.ctx
}

const install = (app: App) => {
  // todo
}
export default install
