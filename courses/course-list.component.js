angular
  .module('courses')
  .component('courseList', {
    templateUrl: 'courses/course-list.template.html',
    controller: courseListComponent
  })

function courseListComponent($scope, store) {
  $scope.courses = []
  store.get('courses').then(courses => $scope.courses = courses)
}
