class Store {
  constructor($http, $q) {
    this.$http = $http
    this.$q = $q

    this.location = 'https://caab.sim.vuw.ac.nz/api'
    this.namespace = localStorage.store || 'carlandtarryn'

    this._lock = $q.resolve()

    this._lock = this._checkCustomSchemaInPlace().then(inPlace => {
      if (!inPlace && confirm('Initialise custom schema?')) {
        this._loadAll().then(this._storeCustomSchema.bind(this))
      }
    })
  }

  get(model, filter) {
    return this.$q.resolve(
      this._lock.then(() => {
        switch (typeof filter) {
          case 'function': return this._getByPredicate(model, filter)
          case 'undefined': return this._getAll(model)
          default: return this._getById(model, filter)
        }
      })
    )
  }

  save(model, updated) {
    return this._lock
      .then(() => this._lock = this._getAll(model))
      .then(records => records.map((record, i) => record.id === updated.id ? updated : record))
      .then(records => this._save(model, records))
  }

  async delete(model, record) {
    const id = typeof record === 'object' ? record.id : record
    
    await this._lock

    return this._lock = this._getAll(model)
      .then(records => records.filter(r => r.id !== id))
      .then(records => this._delete(model, records))
  }

  get namespacedLocation() {
    return `${this.location}/${this.namespace}`
  }

  _checkCustomSchemaInPlace() {
    return this.$http.get(`${this.namespacedLocation}/assignment.__CUSTOM_SCHEMA__.json`)
      .then(res => res.data)
      .then(record => record && !record.Message !== 'An error has occured.')
  }

  async _loadAll() {
    const db = {}

    // Intentially synchronous as the server 500s if you hit it too hard
    for (const endpoint in Store.endpoints) {
      const { deserialise, name } = Store.endpoints[endpoint]

      db[name] = await this.$http.get(`${this.namespacedLocation}/${endpoint}`)
        .then(res => res.data)
        .then(deserialise)
    }

    return db
  }

  async _storeCustomSchema(db) {
    const method = 'POST'

    // Intentially synchronous as the server 500s if you hit it too hard
    for (const name in db) {
      const records = db[name]
      
      const url = `${this.namespacedLocation}/update.assignment_directory.json`
      const data = {
        ID: name,
        Name: JSON.stringify(records),
        Overview: null,
        CourseID: null,
        DueDate: null
      }

      await this.$http({ method, url, data })
    }

    const url = `${this.namespacedLocation}/update.assignment_directory.json`
    const data = {
      ID: '__CUSTOM_SCHEMA__',
      Name: '1'
    }

    await this.$http({ method, url, data })
  }

  _getAll(model) {
    return this.$q.resolve(
      this.$http.get(`${this.namespacedLocation}/assignment.${model}.json`)
        .then(({ data }) => (data.Name && JSON.parse(data.Name)) || [])
        .catch(err => [])
    )
  }

  _getById(model, id) {
    return this.$q.resolve(
      this._getAll(model).then(records => records.find(record => record.id === id))
    )
  }

  _getByPredicate(model, predicate) {
    return this.$q.resolve(
      this._getAll(model).then(records => records.filter(predicate))
    )
  }

  async _save(model, records) {
    const url = `${this.namespacedLocation}/update.assignment_directory.json`
    const data = {
      ID: model,
      Name: JSON.stringify(records),
      Overview: null,
      CourseID: null,
      DueDate: null
    }

    await this.$http({ method, url, data })
  }

  async _delete(model, id) {

  }
}
