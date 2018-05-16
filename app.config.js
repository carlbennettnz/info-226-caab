const application = angular
  .module('app')
  .config(configureApp)

function configureApp($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'accounts/login.template.html',
      controller: 'login'
    })
    .when('/students/dashboard', {
      templateUrl: 'student-dashboard.template.html',
      controller: 'studentDashboard'
    })
    .when('/students/edit-course-list', {
      templateUrl: 'courses/edit-course-list.template.html',
      controller: 'editCourseList'
    })
    .when('/students/assignments', {
      templateUrl: 'courses/assignments.template.html',
      controller: 'assignments'
    })
    .when('/students/assignments/assignment-detail', {
      templateUrl: 'courses/assignment-detail.html',
      controller: 'assignmentDetail'
    })
    .when('/lecturers/dashboard', {
      templateUrl: 'lecturer-dashboard.template.html',
      controller: 'lecturerDashboard'
    })
    .when('/lecturers/courses/new', {
      templateUrl: 'courses/new-course.template.html',
      controller: 'newCourse'
    })
    .when('/lecturers/courses/:course', {
      templateUrl: 'courses/manage-course.template.html',
      controller: 'manageCourse'
    })
    .otherwise('/login')
}
