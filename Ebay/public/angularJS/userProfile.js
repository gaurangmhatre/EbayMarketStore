var userProfile = angular.module('userProfile', ['ui.router']);

/*
userProfile.config(
            function ($routeProvider) {
                $routeProvider.                 
                    when('/accountDetails', {
                        templateUrl: '/public/templates/userProfile/accountDetails.html',
                        controller: 'accountDetailsController'
                    }).
                    when('/activity', {
                        templateUrl: '/public/templates/userProfile/activity.html',
                        controller: 'activityController'
                    }).
                    when('/cart', {
                        templateUrl: '/public/templates/userProfile/cart.html',
                        controller: 'cartController'
                    }).
                    when('/sellItem', {
                        templateUrl: '/public/templates/userProfile/sellItem.html',
                        controller: 'sellItemController'
                    });
            });

*/
userProfile.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$stateProvider.state('userProfile', {	
		url : '/userProfile',
		views: {
            'header': {
                templateUrl : '/templates/userProfile/header.html',
            },
            'cart': {
                templateUrl : '/templates/userProfile/cart.html',
            },
		}
	})
	$urlRouterProvider.otherwise('/');
});



userProfile.controller('activityController',function($scope, $http, $state){
});





userProfile.controller('sellItemController',function($scope, $http, $state){
});