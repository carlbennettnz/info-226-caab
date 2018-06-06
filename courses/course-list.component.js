angular
  .module('courses')
  .component('courseList', {
    templateUrl: 'courses/course-list.template.html',
    controller: courseListComponent
  })

function courseListComponent($scope, store, session) {
  $scope.courses = []
  $scope.loading = true
  
  const user = session.getUser()

  store.get('courseAssociations', assoc => assoc.studentId === user.id)
    .then(assocs => assocs.map(assoc => assoc.courseId))
    .then(courseIds => store.get('courses', course => courseIds.includes(course.id)))
    .then(courses => $scope.courses = courses)
    .then(() => $scope.loading = false)
}
