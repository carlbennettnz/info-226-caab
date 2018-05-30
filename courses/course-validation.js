
function validateCourse(course) {
  const thingsToCheck = [
    { value: course.name, message: 'The course needs a name' },
    { value: course.overview, message: 'The course needs an overview' }
  ]

  return thingsToCheck
    .filter(({ value }) => notPresent(value))
    .map(({ message }) => message)
}

function notPresent(value) {
  return value == null || value.length === 0
}