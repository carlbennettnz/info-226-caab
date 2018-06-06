angular
  .module('assignments')
  .controller('viewAssignment', viewAssignmentController)

function viewAssignmentController($scope, $routeParams, store, session) {
  $scope.course = {
    code: $routeParams.course
  }

  $scope.assignment = {
    id: Number($routeParams.assignment)
  }

  $scope.questions = []

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
  store.get('assignments', $scope.assignment.id).then(assignment => $scope.assignment = assignment)
  store.get('questions', q => q.assignmentId = $scope.assignment.id).then(qs => $scope.questions = qs).then(console.log)

  $scope.ask = () => {
    $scope.askErrors = []

    store.create('questions', {
      assignmentId: $scope.assignment.id,
      question: $scope.newQuestion,
      asker: session.getUser().loginName,
      answer: null
    }).then(q => $scope.questions.push(q))
    .catch(err => $scope.askErrors = err)
  }
}
