angular
  .module('app')
  .controller('lecturerDashboard', lecturerDashboardController)

function lecturerDashboardController($scope, store) {
  $scope.courses = []
  store.get('courses').then(courses => $scope.courses = courses)
}
