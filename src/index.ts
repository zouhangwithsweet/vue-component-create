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

export type SlotsData = (createVnode: typeof h) => Record<string, () => VNodeChild>

let seed = 0
const instances: VNode[] = []

const createComponent = <P extends Record<string, any> = {}>(
  componentCtor: Component & {
    _instance?: ComponentPublicInstance | null
  },
  options: P,
  slots: null | SlotsData = null,
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
    $cre['$updateProps'] = function (props: Record<string, VNode>, slots: null | SlotsData) {
      _options = { ..._options, ...props }
      _slots = slots ? { ...(_slots || {}), ...slots(h) } : null
      vm.component?.proxy?.$forceUpdate()
    }

    document.body.appendChild(container)
  }

  return $cre as ComponentPublicInstance<
    {},
    {},
    {},
    {},
    {
      $updateProps: (options?: Record<string, any>, slots?: null | SlotsData) => void
      $remove: () => void
    }
  >
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
    _instance?: ComponentPublicInstance<
      {},
      {},
      {},
      {},
      {
        $updateProps: (options?: Record<string, any>, slots?: null | SlotsData) => void
        $remove: () => void
      }
    > | null
  },
  single?: boolean
) {
  if (!componentCtor.name) {
    throw Error('The Component must have a name.')
  }

  app.config.globalProperties[`$create${camelize(componentCtor.name).replace(/^\w/, ($) => $.toUpperCase())}`] =
    function <P extends Record<string, any> = {}>(options: P, slots = null) {
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
        this ? this._.appContext : null
      ))
      removeFromParent.call(this, vm)

      return vm
    }
}
