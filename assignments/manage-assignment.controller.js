angular
  .module('assignments')
  .controller('manageAssignment', manageAssignmentController)

function manageAssignmentController($scope, $routeParams, store) {
  $scope.course = {
    id: $routeParams.course
  }

  $scope.assignment = {
    id: $routeParams.assignment
  }

  $scope.questions = [{
    asker: 'Carl Bennett',
    question: 'hello i am stuck pls help',
    answer: 'no'
  }, {
    asker: 'John Doe',
    question: 'what is the answer to #3',
    answer: null
  }]

  $scope.submissions = [{
    studentName: 'Tarryn Palmer',
    submissionDate: new Date('2018-05-02'),
    grade: 'A+'
  }, {
    studentName: 'Carl Bennett',
    submissionDate: new Date('2018-05-15'),
    grade: null
  }]

  store.get('courses', $scope.course.id).then(course => $scope.course = course)
  store.get('assignments', $scope.assignment.id).then(a => $scope.assignment = a)
}
