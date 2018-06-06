const UserModel = {
  name: 'users',
  endpoint: 'user_list.json',

  validate(user) {
    return Model.validate(user, {
      id: attr(a => a.type('number')),
      loginName: attr(a => a.type('string').required()),
      password: attr(a => a.type('string').required()),
      userType: attr(a => a.type('string').required())
    })
  },

  deserialise(response) {
    return response.users.map(record => ({
      id: Number(record.ID),
      loginName: record.LoginName,
      password: record.Password,
      userType: record.UserType
    }))
  }
}
