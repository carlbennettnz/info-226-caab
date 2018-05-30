class Store {
  constructor($http, $q) {
    this.$http = $http
    this.$q = $q

    this.location = 'https://caab.sim.vuw.ac.nz/api'
    this.namespace = localStorage.store || 'carlandtarryn'

    this._lock = this._checkCustomSchemaInPlace().then(inPlace => {
      if (!inPlace && confirm('Initialise custom schema?')) {
        return this._loadAll().then(this._storeCustomSchema.bind(this))
      }
    }).catch(err => console.error(err))
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
    return this._lock = this._lock
      .then(() => this._getAll(model))
      .then(records => records.map(r => r.id).includes(updated.id)
        ? records.map((record, i) => record.id === updated.id ? updated : record)
        : [ ...records, updated ])
      .then(records => this._save(model, records))
  }

  create(model, record) {
    let recordWithId

    return this._lock = this._lock
      .then(() => this._getAll(model))
      .then(records => this._addNewRecord(records, record))
      .then(records => { recordWithId = records.slice(-1)[0]; return records; })
      .then(records => this._save(model, records))
      .then(() => recordWithId)
  }

  delete(model, record) {
    const id = typeof record === 'object' ? record.id : record

    console.log(record.id)
  
    return this._lock = this._lock
      .then(() => this._getAll(model))
      .then(r => { console.log('before', r.length); return r; })
      .then(records => records.filter(r => r.id !== id))
      .then(r => { console.log('after', r.length); return r; })
      .then(records => this._save(model, records))
  }

  get namespacedLocation() {
    return `${this.location}/${this.namespace}`
  }

  _checkCustomSchemaInPlace() {
    return this.$http.get(`${this.namespacedLocation}/assignment.__CUSTOM_SCHEMA__.json`)
      .then(res => res.data)
      .then(record => record && record.Message !== 'An error has occurred.')
      .catch(err => err.data && err.data.Message !== 'An error has occurred.')
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

    db.themes = []

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

  _addNewRecord(existing, record) {
    if (record.id == null) {
      if (existing.length && typeof existing[0].id === 'string') {
        throw new Error('You tried to create a new record without an ID, but model type uses string IDs. You need to provide an ID.')
      }

      const lastId = existing.length
        ? existing.map(r => r.id).sort().slice(-1)[0]
        : 0
      
      record.id = lastId + 1
    }

    return [ ...existing, record ]
  }

  async _save(model, records) {
    const method = 'POST'
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
}