angular
  .module('courses')
  .controller('newCourse', newCourseController)

function newCourseController($scope) {
  $scope.course = {}

  $scope.maxlength = 1;
  
 
  
}
