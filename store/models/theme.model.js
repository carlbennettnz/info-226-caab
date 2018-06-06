const ThemeModel = {
  name: 'users',

  validate(theme) {
    return Model.validate(theme, {
      id: attr(a => a.type('number').required()),
      colour: attr(a => a.type('string').required())
    })
  }
}
