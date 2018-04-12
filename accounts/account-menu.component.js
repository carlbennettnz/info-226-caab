angular
  .module('accounts')
  .component('accountMenu', {
    templateUrl: 'accounts/account-menu.template.html',
    controller($scope, session) {
      $scope.showMenu = false
      $scope.toggleMenu = () => $scope.showMenu = !$scope.showMenu
      $scope.user = session.getUser()
    }
  })
