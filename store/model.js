const Model = {
  validate(values, attrs) {
    const errors = []

    for (const attr in attrs) {
      try {
        console.log(attrs[attr])
        attrs[attr](attr, values[attr])
      } catch (err) {
        errors.push(err.message)
      }
    }

    return errors
  }
}
