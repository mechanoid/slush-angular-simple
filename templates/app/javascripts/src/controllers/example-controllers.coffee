angular.module('exampleControllers', [])
.controller 'ExampleController', ($scope, $http) ->
  $scope.items = [
    { name: "Harry" }
    { name: "Ron" }
    { name: "Hermine" }
  ]
