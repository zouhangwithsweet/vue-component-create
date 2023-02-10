```typescript
this.$createModal<Omit<ModalConfig, 'content'>>({}, (h) => ({
  default:
    () => `
    You can customize modal body text by the current situation.
    This modal will be closed immediately once you press
    the OK button.`,
})).show()
```
