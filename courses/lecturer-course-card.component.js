angular
  .module('courses')
  .component('lecturerCourseCard', {
    templateUrl: 'courses/lecturer-course-card.template.html',
    controller: lecturerCourseCardComponent,
    bindings: { course: '<' }
  })

function lecturerCourseCardComponent($scope, $q, store) {
  $scope.loading = true

  store.get('assignments', a => a.courseId === this.course.id)
    .then(assignments => assignments.map(a => a.id))
    .then(assignmentIds => {
      console.log(assignmentIds)

      const loadSubmissions = store.get('submissions', s => assignmentIds.includes(s.assignmentId) && !s.grade)
        .then(submissions => $scope.pendingSubmissions = submissions.length)
        .catch(console.error)
      
      const loadQuestions = store.get('questions', q => assignmentIds.includes(q.assignmentId) && !q.answer)
        .then(questions => $scope.unansweredQuestions = questions.length)
        .catch(console.error)
      
      $q.all([ loadSubmissions, loadQuestions ])
        .then(() => $scope.loading = false)
    })
    .catch(console.error)
}