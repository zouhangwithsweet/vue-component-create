import {
  render,
  createVNode,
  mergeProps,
  camelize,
  h,
  isVNode,
  VNode,
  AppContext,
  Component,
  ComponentPublicInstance,
  App,
  VNodeChild,
} from 'vue'

export type CreateSlotsData = (createVnode: typeof h) => Record<string, () => VNodeChild>
export type CreateComponentProperties = {
  $updateProps: (options?: Record<string, any>, slots?: null | CreateSlotsData) => void
  $remove: () => void
}
export type CreateFunction = <P extends Record<string, any> = {}, M extends Record<string, any> = {}>(
  options: P,
  slots?: null | CreateSlotsData
) => ComponentPublicInstance<P, {}, {}, {}, CreateComponentProperties & M>

let seed = 0
const instances: VNode[] = []

const createComponent = <P extends Record<string, any> = {}>(
  componentCtor: Component & {
    _instance?: ComponentPublicInstance | null
  },
  options: P,
  slots: null | CreateSlotsData = null,
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

  let $cre: ComponentPublicInstance<any> | undefined

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
      ~idx && instances.splice(idx, 1)
    }

    // add $updateProps
    $cre['$updateProps'] = function (props: Record<string, VNode>, slots: null | CreateSlotsData) {
      _options = { ..._options, ...props }
      _slots = slots ? { ...(_slots || {}), ...slots(h) } : null
      vm.component?.proxy?.$forceUpdate()
    }

    document.body.appendChild(container)
  }

  return $cre as ComponentPublicInstance<{}, {}, {}, {}, CreateComponentProperties>
}

function removeFromParent(this: any, vm: ReturnType<typeof createComponent>) {
  const hasParent = !!this && !!this._ && isVNode(this._.vnode)

  if (hasParent) {
    const parentVnodeProps = this && this._ && isVNode(this._.vnode) ? this._.vnode.props : null

    this._.vnode.props = mergeProps(parentVnodeProps || {}, {
      onVnodeBeforeUnmount() {
        vm.$remove()
      },
    })
  }
}

export function createAPI(
  app: App,
  componentCtor: Component & {
    _instance?: ComponentPublicInstance<{}, {}, {}, {}, CreateComponentProperties> | null
    $create?: CreateFunction
  },
  single?: boolean
) {
  if (!componentCtor.name) {
    throw Error('The Component must have a name.')
  }

  function initComponent<P extends Record<string, any> = {}>(this: any, options: P, slots = null) {
    if (single && componentCtor._instance) {
      if (options) {
        componentCtor._instance.$updateProps(options, slots)
      }

      removeFromParent.call(this, componentCtor._instance)

      return componentCtor._instance
    }
    const vm = (componentCtor._instance = createComponent<P>(
      componentCtor,
      options,
      slots,
      this ? this?._?.appContext : null
    ))

    removeFromParent.call(this, vm)

    return vm
  }

  componentCtor.$create = app.config.globalProperties[
    `$create${camelize(componentCtor.name).replace(/^\w/, ($) => $.toUpperCase())}`
  ] = initComponent as unknown as CreateFunction
}
