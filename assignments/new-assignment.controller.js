angular
  .module('assignments')
  .controller('newAssignment', newAssignmentController)

function newAssignmentController($scope, $routeParams, store) {
  $scope.course = {
    id: $routeParams.course
  }

  $scope.assignment = {}

  store.get('courses', $routeParams.course).then(course => $scope.course = course).then(console.log)
}
