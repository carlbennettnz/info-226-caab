angular
  .module('assignments')
  .component('assignmentList', {
    templateUrl: 'assignments/assignment-list.template.html',
    bindings: { course: '<' },
    controller: assignmentListController
  })

function assignmentListController($scope, $http) {
  console.log($scope.course)

  $http({
    method: 'GET',
    url: 'https://caab.sim.vuw.ac.nz/api/bennetcarl2/assignment_directory.json'
  }).then(response => {
    if (response.data.assignments) {
      $scope.assignments = response.data.assignments
        .filter(assignment => assignment.CourseID === this.course.code)
        .map(({ ID, Name, DueDate }) => ({ id: ID, title: Name, dueDate: new Date(DueDate) }))
    }
  })
}
