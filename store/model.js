class Model {
  constructor(values) {
    this.values = values
  }

  validate(attrs) {
    for (const attr in attrs) {
      attrs[attr](attr, this.values[attr])
    }
  }
}

Model.symbols = {
  name: Symbol('name'),
  deserialise: Symbol('deserialise'),
  endpoint: Symbol('endpoint')
}
