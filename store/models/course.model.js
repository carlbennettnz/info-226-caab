const CourseModel = {
  name: 'courses',
  endpoint: 'course_directory.json',

  validate(course) {
    return Model.validate(course, {
      id: attr(a => a.type('number')),
      name: attr(a => a.type('string').required()),
      overview: attr(a => a.type('string').required()),
      year: attr(a => a.type('number').required()),
      trimester: attr(a => a.type('number').required()),
      lectureTimes: attr(a => a.type('string').required()),
      trimester: attr(a => a.type('string').required())
    })
  },

  deserialise(response) {
    return response.courses.map(record => ({
      id: record.ID,
      name: record.Name,
      overview: record.Overview,
      year: record.Year,
      trimester: record.Trimester,
      lectureTimes: record.LectureTimes ? [record.LectureTimes] : [],
      lecturerId: Number(record.lecturerId)
    }))
  }
}
