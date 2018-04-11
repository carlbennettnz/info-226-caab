angular
  .module('courses')
  .component('courseList', {
    templateUrl: 'courses/course-list.template.html',
    controller($scope, $http) {
      $scope.courses = [
        { code: 'INFO226', title: 'Web Application Development' },
        { code: 'INFO6354g', title:' PFJO' }
      ]

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
