angular
  .module('courses')
  .controller('viewCourse', viewCourseController)

function viewCourseController($scope, $routeParams, store) {
  $scope.course = { id: $routeParams.course }
  console.log('hi')
  store.get('courses', $routeParams.course).then(course => $scope.course = course)
}
