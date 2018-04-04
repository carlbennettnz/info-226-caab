angular
  .module('accounts')
  .component('login', {
    templateUrl: 'accounts/login.template.html',
    controller($scope, $location) {
      $scope.action = ($event) => {
        $event.preventDefault()
        $location.path('/courses')
      }
    }
  })
