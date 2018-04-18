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
    .when('/lecturers/dashboard', {
      templateUrl: 'lecturer-dashboard.template.html',
      controller: 'lecturerDashboard'
    })
    .otherwise('/login')
}
