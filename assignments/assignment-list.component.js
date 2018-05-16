angular
  .module('assignments')
  .component('assignmentList', {
    templateUrl: 'assignments/assignment-list.template.html',
    bindings: { course: '<', context: '@' },
    controller: assignmentListController
  })

function assignmentListController($scope, store) {
  $scope.assignments = []
  store.get('assignments', a => a.courseId === this.course.id)
    .then(assignments => $scope.assignments = assignments)
}
