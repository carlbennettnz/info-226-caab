const application = angular
  .module('app')
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', { template: '<login></login>' })
      .when('/dashboard', { template: '<dashboard></dashboard>' })
      .when('/lecturer-dashboard', { template: '<lecturer-dashboard></lecturer-dashboard>' })
      .otherwise('/login')
  })
