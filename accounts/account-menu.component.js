angular
  .module('accounts')
  .component('accountMenu', {
    templateUrl: 'accounts/account-menu.template.html',
    controller($scope) {
      $scope.showMenu = false
      $scope.toggleMenu = () => $scope.showMenu = !$scope.showMenu
    }
  })
