const CourseAssociationModel = {
  name: 'courseAssociations',
  endpoint: 'course_association_directory.json',

  validate(user) {
    return Model.validate(user, {
      studentId: attr(a => a.type('number').required()),
      courseId: attr(a => a.type('string').required())
    })
  },

  deserialise(response) {
    return response.courseAssociations.map(record => ({
      studentId: Number(record.StudentID),
      courseId: record.CourseID
    }))
  }
}
