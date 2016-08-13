(function() {
	'use strict';
    var app = angular
      .module('foodApp', [
        'ngRoute',
        'foodControllers'
      ])

    .config(function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/default.html',
          controller: 'FoodControllers'
        })
        .when('/burgers', {
          templateUrl: 'views/burgers.html',
          controller: 'FoodControllers'
        })
        .when('/salad', {
          templateUrl: 'views/salad.html',
          controller: 'FoodControllers'
        })
        .when('/cake', {
          templateUrl: 'views/cake.html',
          controller: 'FoodControllers'
        })
        .when('/pizza', {
          templateUrl: 'views/pizza.html',
          controller: 'FoodControllers'
        })
        .when('/chinese', {
          templateUrl: 'views/chinese.html',
          controller: 'FoodControllers'
        }).otherwise({
          redirectTo: '/'
        });
    });
    
})();