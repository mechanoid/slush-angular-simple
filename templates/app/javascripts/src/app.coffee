appControllers = require './controllers'

app = angular.module 'app', ['ngRoute', 'appControllers']

app.config ($routeProvider, $httpProvider) ->
  $routeProvider.when '/',
    templateUrl: './app/views/example.html',
    controller: 'ExampleController'
