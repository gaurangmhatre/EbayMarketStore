
userProfile.controller('cartController', function($scope,$http) {
	
	$scope.unexpected_error = true;

	console.log("inside cart controller");

	//console.log("userId:: " + $scope.userId)

	
	$http({
		method : "POST",
		url : '/getAllProductsInCart',//change the method to get 10 items at a time.
		data : {
			
		}
	}).success(function(data) {
		console.log("inside success");
		console.log("data is ::");
		console.log(data);
		
		$scope.allProductsInCart = data;
		
		//set all variables.
			 
	}).error(function(error) {
		console.log("inside error");
		console.log(error);
		$scope.unexpected_error = false;
		$scope.invalid_login = true;
		$window.alert("unexpected_error");
	});
	
});