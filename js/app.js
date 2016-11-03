(function() {
	'use strict';
    var app = angular
      .module('foodApp', [
        'ui.router',
        'foodControllers'
      ])

    .config(function($stateProvider, $urlRouterProvider) {
        
        
      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise("/home");
        
        
        // Now set up the states
        $stateProvider
        .state('home', {
          url: "/home",
          templateUrl: "views/default.html"
        })
        .state('chinese', {
          url: "/chinese",
          templateUrl: "views/chinese.html"
        })
        .state('burgers', {
          url: "/burgers",
          templateUrl: "views/burgers.html"
        })
        .state('salad', {
          url: "/salad",
          templateUrl: "views/salad.html"
        })
        
        .state('cake', {
          url: "/cake",
          templateUrl: "views/cake.html"
        })
        
        .state('pizza', {
          url: "/pizza",
          templateUrl: "views/pizza.html"
        });
        
        
     
    });
    
})();