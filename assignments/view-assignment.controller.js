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

  const user = session.getUser()

  store.get('courses', $scope.course.id).then(course => $scope.course = course)
  store.get('assignments', $scope.assignment.id).then(assignment => $scope.assignment = assignment)
  store.get('questions', q => q.assignmentId = $scope.assignment.id).then(qs => $scope.questions = qs)
  store.get('submissions', s => s.assignmentId = $scope.assignment.id && s.studentName === user.loginName)
    .then(ss => $scope.submission = ss && ss[0])

  $scope.ask = () => {
    $scope.askErrors = []

    store.create('questions', {
      assignmentId: $scope.assignment.id,
      question: $scope.newQuestion,
      asker: user.loginName,
      answer: null
    }).then(q => $scope.questions.push(q))
    .catch(err => $scope.askErrors = err)
  }

  $scope.submit = () => {
    $scope.submissionErrors = []

    store.create('submissions', {
      studentName: user.loginName,
      submissionDate: new Date(),
      assignmentId: $scope.assignment.id,
      content: $scope.submissionDraft,
      grade: null
    })
      .then(s => $scope.submission = s)
      .catch(err => $scope.submissionErrors = err)
  }
}
