function defineModelProperty(Model, propName, value) {
  Object.defineProperty(Model, Model.symbols[propName], {
    enumerable: false,
    writable: false,
    configurable: false,
    value
  })
}
