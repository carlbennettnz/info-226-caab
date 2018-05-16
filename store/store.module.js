angular
  .module('store', [])
  .config(storeConfig)

function storeConfig($provide) {
  $provide.factory('store', ($http, $q) => new Store($http, $q))
}
