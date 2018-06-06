const SubmissionModel = {
  name: 'submissions',

  validate(submission) {
    return Model.validate(submission, {
      id: attr(a => a.type('number')),
      studentName: attr(a => a.type('string').required()),
      submissionDate: attr(a => a.type('date').required()),
      content: attr(a => a.type('string').required()),
      grade: attr(a => a.type('string'))
    })
  },

  fromJSON(pojo) {
    return { ...pojo, submissionDate: new Date(pojo.submissionDate) }
  },

  toJSON(pojo) {
    const submissionDate = pojo.submissionDate && !isNaN(pojo.submissionDate) ? pojo.submissionDate.toISOString().substr(0, 10) : null
    return { ...pojo, submissionDate }
  }
}
