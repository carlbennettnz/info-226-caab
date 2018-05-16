Store.endpoints = {
  'user_list.json': {
    name: 'users',
    deserialise(response) {
      return response.users.map(record => ({
        id: record.ID,
        loginName: record.LoginName,
        password: record.Password,
        userType: record.UserType
      }))
    }
  },

  'assignment_directory.json': {
    name: 'assignments',
    deserialise(response) {
      return response.assignments.map(record => ({
        id: record.ID,
        name: record.Name,
        overview: record.Overview,
        courseId: record.CourseID,
        dueDate: new Date(record.DueDate).toISOString()
      }))
    }
  },

  'course_directory.json': {
    name: 'courses',
    deserialise(response) {
      return response.courses.map(record => ({
        id: record.ID,
        name: record.Name,
        overview: record.Overview,
        year: record.Year,
        trimester: record.Trimester,
        lectureTimes: record.LectureTimes ? [ record.LectureTimes ] : [],
        lecturerId: record.lecturerId
      }))
    }
  },

  'course_association_directory.json': {
    name: 'courseAssociations',
    deserialise(response) {
      return response.courseAssociations.map(record => ({
        studentId: record.StudentID,
        courseId: record.CourseID
      }))
    }
  }
}
