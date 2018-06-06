const AssignmentModel = {
  name: 'assignments',
  endpoint: 'assignment_directory.json',

  validate(assignment) {
    return Model.validate(assignment, {
      id: attr(a => a.type('number')),
      name: attr(a => a.type('string').required()),
      overview: attr(a => a.type('string').required()),
      courseId: attr(a => a.type('string').required()),
      dueDate: attr(a => a.type('date').required())
    })
  },

  deserialise(response) {
    return response.assignments.map(record => new AssignmentModel({
      id: Number(record.ID),
      name: record.Name,
      overview: record.Overview,
      courseId: record.CourseID,
      dueDate: new Date(record.DueDate).toISOString()
    }))
  }
}
