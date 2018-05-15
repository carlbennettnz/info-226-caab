angular
  .module('assignments')
  .controller('newAssignment', manageAssignmentController)

function manageAssignmentController($scope, $routeParams, $http) {
  $scope.course = {
    code: $routeParams.course
  }

  $scope.assignment = {
    id: $routeParams.assignment
  }

  $http({
    method: 'GET',
    url: `https://caab.sim.vuw.ac.nz/api/bennetcarl2/course.${$scope.course.code}.json`
  }).then(response => {
    const course = response.data

    $scope.course = {
      code: course.ID,
      title: course.Name,
      overview: course.Overview,
      year: course.Year,
      trimester: course.Trimester,
      lectureTimes: course.LectureTimes,
      lecturerId: course.LecturerID
    }
  })
}
