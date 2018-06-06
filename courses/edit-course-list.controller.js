angular
  .module('courses')
  .controller('editCourseList', editCourseListController)

function editCourseListController($scope, $q, $location, store, session) {
  $scope.courses = []
  $scope.currentCourses = []
  
  const student = session.getUser()

  const getCourses = store.get('courses')
  const getCoursesTaken = store.get('courseAssociations', assoc => assoc.studentId === student.id)
    .then(assocs => assocs.map(assoc => assoc.courseId))

  $q.all([ getCourses, getCoursesTaken ]).then(([ courses, courseIdsTaken ]) => {
    $scope.courses = courses.map(course => ({
      ...course,
      taking: courseIdsTaken.includes(course.id)
    }))
  })

  const assocIsForStudent = assoc => {
    console.log(assoc, student.id)
    return assoc.studentId === student.id
  }

  $scope.save = () => store.delete('courseAssociations', assocIsForStudent)
    .then(() => $scope.courses.filter(course => course.taking))
    .then(courses => courses.map(course => ({ studentId: student.id, courseId: course.id })))
    .then(assocs => store.create('courseAssociations', assocs))
    .then(() => $location.path('/students/dashboard'))
}
