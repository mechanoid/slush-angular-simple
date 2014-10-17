app = angular.module 'app', ['ngRoute', 'controllers', 'services', 'filters']

app.config ($routeProvider, $httpProvider) ->
  $routeProvider.when '/',
    templateUrl: './app/views/example.html',
    controller: 'ExampleController'
