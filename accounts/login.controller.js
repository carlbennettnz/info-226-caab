angular
  .module('accounts')
  .controller('login', loginController)

function loginController($scope, $location, $timeout, session, store) {
  $scope.errors = []

  const userListPromise = store.get('users')

  $scope.doLogin = ($event) => {
    $event.preventDefault()

    $scope.errors = []
    if (!$scope.username) $scope.errors.push('You must provide a username')
    if (!$scope.password) $scope.errors.push('You must provide a password')
    if ($scope.errors.length) return

    userListPromise.then(users => {
      const user = users.find(
        user => user.loginName === $scope.username
        && user.password === $scope.password
      )

      if (!user) {
        $scope.errors.push('Login details are incorrect')
        return
      }
      
      session.setUser(user)

      if (user.userType === 'lecturer') {
        $location.path('/lecturers/dashboard')
      } else {
        $location.path('/students/dashboard')
      }
    })
  }
}
