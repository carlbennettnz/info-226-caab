const SubmissionModel = {
  name: 'submissions',

  validate(submission) {
    return Model.validate(submission, {
      id: attr(a => a.type('number')),
      studentName: attr(a => a.type('string').required()),
      submissionDate: attr(a => a.type('date').required()),
      grade: attr(a => a.type('string'))
    })
  }
}
