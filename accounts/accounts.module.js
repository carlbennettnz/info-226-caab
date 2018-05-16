angular
  .module('accounts', [ 'store' ])
  .config(function($provide) {
    $provide.factory('session', function() {
      let user = localStorage.caabUser && JSON.parse(localStorage.caabUser)

      return {
        getUser() {
          return user
        },

        setUser(u) {
          localStorage.caabUser = JSON.stringify(u)
          user = u
        }
      }
    })
  })
