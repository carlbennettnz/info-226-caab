angular
  .module('assignments')
  .controller('newAssignment', newAssignmentController)

function newAssignmentController($scope, $routeParams, $location, store) {
  $scope.course = {
    id: $routeParams.course
  }

  $scope.assignment = {}

  store.get('courses', $routeParams.course).then(course => $scope.course = course)

  $scope.save = () => {
    $scope.errors = []

    store.create('assignments', {
      name: $scope.assignment.name,
      overview: $scope.assignment.overview,
      courseId: $scope.course.id,
      dueDate: new Date($scope.assignment.dueDate)
    })
      .then(() => $location.path('/lecturers/courses/' + $scope.course.id))
      .catch(err => $scope.errors = err)
  }
}
