var userProfile = angular.module('userProfile', ['ui.router']);


userProfile.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$stateProvider.state('userProfile', {	
			url : '/',
			views: {
	            'header': {
	                templateUrl : 'templates/userProfile/header.html',
	                
	            },
	            'accountDetails': {
	                templateUrl : 'templates/userProfile/accountDetails.html',
	                controller: 'accountDetailsController'
	            },
	            'activity': {
	                templateUrl : 'templates/userProfile/activity.html',
	                controller: 'activityController'
	            },
	            'cart': {
	                templateUrl : 'templates/userProfile/cart.html',
	                controller: 'cartController'
	            },
	            'sellItem': {
	                templateUrl : 'templates/userProfile/sellItem.html',
	                controller: 'sellItemController'
	            },
			}
		})
		$urlRouterProvider.otherwise('/');
	});



userProfile.controller('accountDetailsController',function($scope, $http,$state){
	
	
	
});


userProfile.controller('activityController',function($scope, $http,$state){
});


userProfile.controller('cartController',function($scope, $http,$state){
});


userProfile.controller('sellItemController',function($scope, $http,$state){
});