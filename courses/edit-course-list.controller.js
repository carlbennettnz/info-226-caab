angular
  .module('courses')
  .controller('editCourseList', editCourseListController)

function editCourseListController($scope, $http, $timeout, session) {
  $scope.courses = []
  $scope.currentCourses = []

  const getCourses = $http({
    method: 'GET',
    url: 'https://caab.sim.vuw.ac.nz/api/bennetcarl2/course_directory.json'
  })

  const getCourseAssociations = $http({
    method: 'GET',
    url: 'https://caab.sim.vuw.ac.nz/api/bennetcarl2/course_association_directory.json'
  })
  
  Promise.all([ getCourses, getCourseAssociations ]).then(([ coursesResp, courseAssociationsResp ]) => {
    if (!coursesResp.data.courses || !courseAssociationsResp.data.courseAssociations) {
      console.error('failed to load courses or course associations')
      return
    }

    const student = session.getUser()
    const courses = coursesResp.data.courses
    const takingIds = courseAssociationsResp.data.courseAssociations
      .filter(assoc => assoc.StudentID === student.ID)
      .map(assoc => CourseID)

    $timeout(() => {
      $scope.courses = courses.map((course, i) => ({
        code: course.ID,
        title: course.Name,
        taking: takingIds.includes(course.ID) || i === 0
      }))
      console.log($scope.courses)
    }, 0)
  })
}
