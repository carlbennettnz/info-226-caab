angular
  .module('assignments')
  .controller('manageAssignment', manageAssignmentController)

function manageAssignmentController($scope, $routeParams, $location, store) {
  $scope.course = {
    id: $routeParams.course
  }

  $scope.assignment = {
    id: Number($routeParams.assignment)
  }

  $scope.submissions = [{
    studentName: 'Tarryn Palmer',
    submissionDate: new Date('2018-05-02'),
    grade: 'A+'
  }, {
    studentName: 'Carl Bennett',
    submissionDate: new Date('2018-05-15'),
    grade: null
  }]

  $scope.questions = []

  store.get('courses', $scope.course.id).then(course => $scope.course = course)
  store.get('assignments', $scope.assignment.id).then(a => $scope.assignment = a)
  store.get('questions', q => q.assignmentId = $scope.assignment.id).then(qs => {
    console.log(qs)
    $scope.questions = qs
  })

  store.get('questions').then(console.log)

  $scope.save = () => store.save('assignments', $scope.assignment)
    .then(() => alert('Saved!'))

  $scope.delete = () => store.delete('assignments', $scope.assignment)
    .then(() => $location.path('/lecturers/courses/' + $scope.course.id))
  
  $scope.saveAnswer = (qId) => {
    const question = $scope.questions.find(q => q.id = qId)

    question.answer = question.draftAnswer

    store.save('questions', question)
  }
}
