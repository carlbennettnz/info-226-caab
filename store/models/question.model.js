const QuestionModel = {
  name: 'questions',

  validate(question) {
    return Model.validate(question, {
      id: attr(a => a.type('number')),
      asker: attr(a => a.type('string').required()),
      assignmentId: attr(a => a.type('number').required()),
      question: attr(a => a.type('string').required()),
      answer: attr(a => a.type('string')),
    })
  }
}
