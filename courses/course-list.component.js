angular
  .module('courses')
  .component('courseList', {
    templateUrl: 'courses/course-list.template.html',
    controller($scope) {
      $scope.courses = [
        { code: 'INFO226', title: 'Web Application Development' },
        { code: 'INFO6354g', title:' PFJO' }
      ]
    }
  })