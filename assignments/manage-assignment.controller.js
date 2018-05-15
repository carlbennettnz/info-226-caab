angular
  .module('assignments')
  .controller('manageAssignment', manageAssignmentController)

function manageAssignmentController($scope, $routeParams, $http) {
  $scope.course = {
    code: $routeParams.course
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

  $http({
    method: 'GET',
    url: `https://caab.sim.vuw.ac.nz/api/bennetcarl2/course.${$scope.course.code}.json`
  }).then(response => {
    const course = response.data

    $scope.course = {
      code: course.ID,
      title: course.Name,
      overview: course.Overview,
      year: course.Year,
      trimester: course.Trimester,
      lectureTimes: course.LectureTimes,
      lecturerId: course.LecturerID
    }
  })

  $http({
    method: 'GET',
    url: `https://caab.sim.vuw.ac.nz/api/bennetcarl2/assignment.${$scope.assignment.id}.json`
  }).then(({ data: assignment }) => {
    $scope.assignment = {
      name: assignment.Name,
      overview: assignment.Overview,
      courseId: assignment.CourseID,
      dueDate: assignment.DueDate
    }
  })
}
