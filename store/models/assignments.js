class AssignmentModel extends Model {
  constructor(...args) {
    super(...args)
    
    this.validate({
      id: attr(a => a.type('number').required()),
      name: attr(a => a.type('string').required()),
      overview: attr(a => a.type('string').required()),
      courseId: attr(a => a.type('string').required()),
      dueDate: attr(a => a.type('date').required())
    })
  }
}

defineModelProperty(AssignmentModel, 'name', 'assignments')
defineModelProperty(AssignmentModel, 'endpoint', 'assignment_directory.json')
defineModelProperty(AssignmentModel, 'deserialiser', function deserialise(response) {
  return response.assignments.map(record => new AssignmentModel({
    id: Number(record.ID),
    name: record.Name,
    overview: record.Overview,
    courseId: record.CourseID,
    dueDate: new Date(record.DueDate).toISOString()
  }))
})
