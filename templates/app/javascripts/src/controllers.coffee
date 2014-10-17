AppControllers = angular.module('appControllers', [])
AppControllers.controller 'ExampleController', ($scope, $http) ->
  $scope.items = [
    { name: "Harry" }
    { name: "Ron" }
    { name: "Hermine" }
  ]

module.exports = AppControllers
