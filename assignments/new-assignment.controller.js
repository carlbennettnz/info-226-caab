angular
  .module('assignments')
  .controller('newAssignment', newAssignmentController)

function newAssignmentController($scope, $routeParams, $location, store) {
  $scope.course = {
    id: $routeParams.course
  }

  $scope.assignment = {}

  store.get('courses', $routeParams.course).then(course => $scope.course = course).then(console.log)

  $scope.save = () => {
    store.create('assignments', {
      name: $scope.assignment.name,
      overview: $scope.assignment.overview,
      courseId: $scope.course.id,
      dueDate: $scope.assignment.dueDate
    }).then(() => $location.path('/lecturers/courses/' + $scope.course.id))

    $scope.validationErrors = validateAssignment($scope.assignment)
    
    if ($scope.validationErrors.length === 0) {
      store.save('assignments', $scope.assignment)
      .then(() => alert('Assignment created'))
    }
  }  
}
