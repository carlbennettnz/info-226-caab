angular
  .module('courses')
  .controller('editCourseList', editCourseListController)

function editCourseListController($scope, $q, store, session) {
  $scope.courses = []
  $scope.currentCourses = []
  
  const student = session.getUser()

  const getCourses = store.get('courses')
  const getCoursesTaken = store.get('courseMembers', assoc => assoc.studentId === student.id)
    .then(assocs => assocs.map(assoc => assoc.courseId))

  $q.all([ getCourses, getCoursesTaken ]).then(([ courses, courseIdsTaken ]) => {
    $scope.courses = courses.map(course => ({
      ...course,
      taking: courseIdsTaken.includes(course.id)
    }))
  })
}
