angular
  .module('courses')
  .controller('manageCourse', manageCourseController)

function manageCourseController($scope, $routeParams, $location, store) {
  $scope.course = { id: $routeParams.course }
  
  store.get('courses', $routeParams.course)
    .then(course => $scope.course = course)

  $scope.save = () => store.save('courses', $scope.course)
    .then(() => alert('Saved!'))

  $scope.delete = () => store.delete('courses', $scope.course)
    .then(() => $location.path('/lecturers/dashboard'))
}
