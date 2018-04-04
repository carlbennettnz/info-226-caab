const application = angular
  .module('app')
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', { template: '<login></login>' })
      .when('/courses', { template: '<course-list></course-list>' })
      .otherwise('/login')
  })
