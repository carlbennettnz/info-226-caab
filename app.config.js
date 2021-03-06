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
    .when('/students/courses/:course', {
      templateUrl: 'courses/view-course.template.html',
      controller: 'viewCourse'
    })
    .when('/students/courses/:course/assignments/:assignment', {
      templateUrl: 'assignments/view-assignment.template.html',
      controller: 'viewAssignment'
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
    .when('/lecturers/courses/:course/assignments/new', {
      templateUrl: 'assignments/new-assignment.template.html',
      controller: 'newAssignment'
    })
    .when('/lecturers/courses/:course/assignments/:assignment', {
      templateUrl: 'assignments/manage-assignment.template.html',
      controller: 'manageAssignment'
    })
    .when('/lecturers/add-user', {
      templateUrl: 'accounts/add-user.template.html',
      controller: 'addUser'
    })
    .otherwise('/login')
}
