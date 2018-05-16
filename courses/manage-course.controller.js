angular
  .module('courses')
  .controller('manageCourse', manageCourseController)

function manageCourseController($scope, $routeParams, store) {
  $scope.course = { id: $routeParams.course }
  store.get('courses', $routeParams.course).then(course => $scope.course = course)
}
