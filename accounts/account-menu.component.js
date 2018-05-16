angular
  .module('accounts')
  .component('accountMenu', {
    templateUrl: 'accounts/account-menu.template.html',
    controller: accountMenuComponent
  })

function accountMenuComponent($scope, session) {
  $scope.showMenu = false
  $scope.toggleMenu = () => $scope.showMenu = !$scope.showMenu
  $scope.user = session.getUser()
  console.log($scope.user)
  $scope.getColourClass = (colour) => `colour ${colour} ${$scope.theme === colour ? 'selected' : ''}`
  $scope.selectColour = (colour) => {
    localStorage.colour = colour
    $scope.theme = colour
    document.body.style.backgroundColor = colour
  }
  $scope.colours = [
    '#004730',
    '#de8511',
    '#1e3d91',
    '#ff00ff'
  ]
  $scope.theme = localStorage.colour || $scope.colours[0]
  document.body.style.backgroundColor = $scope.theme
}
