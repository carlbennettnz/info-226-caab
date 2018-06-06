angular
  .module('courses')
  .controller('newCourse', newCourseController)

function newCourseController($scope, $location, store) {
  $scope.course = {}

  $scope.save = () => {
    $scope.errors = []

    store.create('courses', $scope.course)
      .then(() => $location.path('/lecturers/dashboard'))
      .catch(err => $scope.errors = err)
  }
}
