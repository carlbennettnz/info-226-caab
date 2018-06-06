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

  $scope.submissions = []
  $scope.questions = []

  store.get('courses', $scope.course.id).then(course => $scope.course = course)
  store.get('assignments', $scope.assignment.id).then(a => {
    $scope.assignment = a
    $scope.dueDate = a.dueDate && !isNaN(a.dueDate)
      ? a.dueDate.toISOString().substr(0, 10)
      : ''
  })
  store.get('submissions', s => s.assignmentId = $scope.assignment.id).then(ss => $scope.submissions = ss)
  store.get('questions', q => q.assignmentId = $scope.assignment.id).then(qs => $scope.questions = qs)

  $scope.save = () => {
    $scope.assignment.dueDate = new Date($scope.dueDate)
    $scope.errors = []

    store.save('assignments', $scope.assignment)
      .then(() => alert('Saved!'))
      .catch(err => {
        if (Array.isArray(err)) $scope.errors = err
        else throw err
      })
  }

  $scope.delete = () => store.delete('assignments', $scope.assignment)
    .then(() => $location.path('/lecturers/courses/' + $scope.course.id))
  
  $scope.saveAnswer = (qId) => {
    const question = $scope.questions.find(q => q.id === qId)

    $scope.answerErrors = []
    
    if (!question || !question.draftAnswer) {
      $scope.answerErrors.push('You must enter an answer')
      return
    }

    question.answer = question.draftAnswer

    store.save('questions', question)
      .catch(err => {
        if (Array.isArray(err)) $scope.answerErrors = err
        else throw err
      })
  }

  $scope.saveGrades = () => {
    for (const submission of $scope.submissions) {
      if (submission.draftGrade) {
        submission.grade = submission.draftGrade
        delete submission.draftGrade
        
        store.save('submissions', submission)
          .then(console.log)
          .catch(console.error)
      }
    }
  }
}
