angular
  .module('courses')
  .controller('manageCourse', manageCourseController)

function manageCourseController($scope) {
  $scope.course = {}
}
