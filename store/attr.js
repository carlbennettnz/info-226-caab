class Attr {
  constructor(name, value) {
    this.name = name
    this.value = value
  }

  type(typeName) {
    if (this.value == null) return this

    const msg = `Expected the field named '${this.name}' to hold a ${typeName}`

    if (typeName === 'number') {
      this.toNumber()
      assert(!Number.isNaN(this.value), msg)
      return this
    }

    if (typeName === 'boolean') {
      this.toBoolean()
    }

    if (typeName === 'date') {
      assert(this.value instanceof Date, msg)
      assert(!isNaN(this.value), msg)
      return this
    }

    assert(typeof this.value === typeName, msg)

    return this
  }

  default(value) {
    if (this.value == null) {
      this.value = value
    }

    return this
  }

  toNumber() {
    this.value = Number(this.value)
  }

  toBoolean() {
    this.value = Boolean(this.value)
  }

  toAbsolutePath() {
    if (typeof this.value === 'string' && !isAbsolute(this.value)) {
      this.value = resolve(__dirname, '../', this.value)
    }

    return this
  }

  required() {
    if (this.value == null || this.value == '') {
      throw new Error(`The field '${this.name}' is required`)
    }

    return this
  }

  unwrap() {
    return this.value
  }

  static unwrapAll(settings) {
    return Object.entries(settings).reduce(
      (unwrapped, [name, setting]) => ({ ...unwrapped, [name]: setting.unwrap() }),
      {}
    )
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

function attr(fn) {
  return (...args) => fn(new Attr(...args))
}
