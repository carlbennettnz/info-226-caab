angular
  .module('courses')
  .component('manageCourses', {
    templateUrl: 'courses/manage-courses.template.html',
    controller($scope, $http) {
      $scope.deleteCourse = (courseId) => {
        $http({
          method: 'DELETE',
          url: `https://caab.sim.vuw.ac.nz/api/bennetcarl2/delete.course.${courseId}.json`
        }).then(response => {
          $scope.courses = $scope.courses.filter(course => course.ID !== courseId)
        })
      }
      $scope.courses = []

      $http({
        method: 'GET',
        url: 'https://caab.sim.vuw.ac.nz/api/bennetcarl2/course_directory.json'
      }).then(response => {
        if (response.data.courses) {
          $scope.courses = response.data.courses.map(course => ({
            code: course.ID,
            title: course.Name
          }))
        }
      })
    }
  })
