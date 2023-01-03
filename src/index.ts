import {
  render,
  createVNode,
  mergeProps,
  camelize,
  h,
  VNode,
  AppContext,
  Component,
  ComponentPublicInstance,
  App,
} from 'vue'

let seed = 0
const instances: VNode[] = []

const createComponent = (
  componentCtor: Component & {
    _instance?: ComponentPublicInstance | null
  },
  options: Record<string, any>,
  slots: null | ((createVnode: typeof h) => Record<string, VNode>) = null,
  context: null | AppContext = null
) => {
  let _options = options
  let _slots = slots ? slots(h) : null

  const container = document ? document.createElement('div') : null
  const id = 'vue_create_component_' + seed++
  const vm = createVNode(
    {
      render() {
        return createVNode(
          componentCtor,
          {
            ..._options,
            ref: '$cre',
          },
          _slots
        )
      },
    },
    { id }
  )

  if (context) {
    vm.appContext = context
  }

  instances.push(vm)

  let $cre:
    | ComponentPublicInstance<any>
    | undefined

  if (container) {
    // mounted component
    render(vm, container)

    $cre = vm.component?.proxy?.$refs['$cre']

    // add $remove
    $cre['$remove'] = function (cb?: Function) {
      render(null, container)
      componentCtor._instance = null
      cb?.()

      if (container && document.body.contains(container)) {
        document.body.removeChild(container)
      }

      const idx = instances.findIndex((item) => {
        const { id: _id } = item.props as any
        return id === _id
      })
      instances.splice(idx, 1)
    }

    // add $updateProps
    $cre['$updateProps'] = function (
      props: Record<string, VNode>,
      slots: null | ((createVnode: typeof h) => Record<string, VNode>)
    ) {
      _options = { ..._options, ...props }
      _slots = slots ? { ...(_slots || {}), ...slots(h) } : null
      vm.component?.proxy?.$forceUpdate()
    }

    document.body.appendChild(container)
  }

  return $cre
}

export function createAPI(
  app: App,
  componentCtor: Component & {
    _instance?: ComponentPublicInstance<any> | null
  },
  single?: boolean
) {
  if (!componentCtor.name) {
    throw Error('The Component must have a name.')
  }

  app.config.globalProperties[
    `$create${camelize(componentCtor.name).replace(/^\w/, ($) => $.toUpperCase())}`
  ] = function (options: Record<string, any>, slots = null) {
    if (single && componentCtor._instance) {
      if (options) {
        componentCtor._instance.$updateProps(options, slots)
      }
      return componentCtor._instance
    }
    const vm = (componentCtor._instance = createComponent(
      componentCtor,
      options,
      slots,
      this ? this._.appContext : null
    ))

    const parentVnodeProps = this ? this._.vnode.props : null
    if (parentVnodeProps) {
      this._.vnode.props = mergeProps(parentVnodeProps || {}, {
        onVnodeBeforeUnmount() {
          vm.$remove()
        },
      })
    }

    return vm
  }
}
