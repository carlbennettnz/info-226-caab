angular
  .module('courses')
  .controller('manageCourse', function ($scope, $routeParams, $http) {
    $scope.course = {
      code: $routeParams.course
    }

    $http({
      method: 'GET',
      url: 'https://caab.sim.vuw.ac.nz/api/bennetcarl2/course_directory.json'
    }).then(response => {
      const course = response.data.courses.find(c => c.ID === $scope.course.code)

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
  })
