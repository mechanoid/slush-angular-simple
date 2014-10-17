app = angular.module 'app', ['ngRoute', 'controllers', 'services']

app.config ($routeProvider, $httpProvider) ->
  $routeProvider.when '/',
    templateUrl: './app/views/example.html',
    controller: 'ExampleController'
