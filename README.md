# vue-create-component(WIP)

受 `vue-create-api` 启发，基于 `Vue3.0` 的 `create-api`；使用 `Vite` 搭建开发环境

### API

> `API` 主要参考 `vue-create-api` 如下  
- `updateProps`；更新 `props` 等，`vue3` 推荐 `onXxx` 来监听事件 
- `remove`；移除组件，卸载 `Dom`
- `$create[Component.name]` ；挂载在 `this` 上的插件调用方法

### TodoList

- [x] `this` 绑定  
- [x] `install` 实现  
- [ ] 生命周期绑定  
- [ ] `provide,inject` 实现  

### Example

```sh
yarn run dev
# view on http://localhost:3000/playground/
```
