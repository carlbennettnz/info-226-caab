const application = angular
  .module('app')
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', { template: '<login></login>' })
      .when('/dashboard', { template: '<dashboard></dashboard>' })
      .otherwise('/login')
  })
