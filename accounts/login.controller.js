angular
  .module('accounts')
  .controller('login', loginController)

function loginController($scope, $location, $http, session) {
  $scope.errors = []

  const userListPromise = $http({
    method: 'GET',
    url: `https://caab.sim.vuw.ac.nz/api/bennetcarl/user_list.json`
  })

  userListPromise.then(response => {
    console.log(response.data.users)
    return response
  })

  $scope.doLogin = ($event) => {
    $event.preventDefault()

    $scope.errors = []
    if (!$scope.username) $scope.errors.push('You must provide a username')
    if (!$scope.password) $scope.errors.push('You must provide a password')
    if ($scope.errors.length) return

    userListPromise.then(response => {
      const users = response.data.users

      const user = users.find(
        user => user.LoginName === $scope.username
          && user.Password === $scope.password
      )

      if (!user) {
        $scope.errors.push('Login details are incorrect')
        return
      }

      session.setUser(user)

      if (user.UserType === 'lecturer') {
        $location.path('/lecturers/dashboard')
      } else {
        $location.path('/students/dashboard')
      }
    })
  }
}
