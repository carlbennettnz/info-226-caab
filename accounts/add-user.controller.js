angular
  .module('accounts')
  .controller('addUser', addUserController)

function addUserController($scope, store) {
  $scope.user = {
    userType: 'student'
  }

  $scope.userTypes = [
    'lecturer',
    'student'
  ]

  $scope.save = () => {
    store.create('users', $scope.user)
      .then(() => $scope.user = { userType: 'student' })
      .then(() => alert('Saved!'))
  }
}
