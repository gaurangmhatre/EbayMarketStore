
userProfile.controller('cartController', function($scope,$http) {
	
	$scope.unexpected_error = true;

	console.log("inside cart controller");
	
	initialize();
	
	function initialize(){
		$scope.TotalCostOfCart=0;
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
			$scope.TotalCostOfCart=0
			$scope.allProductsInCart = data;
			
			
			for(product in $scope.allProductsInCart)
			{
				$scope.TotalCostOfCart = $scope.TotalCostOfCart+$scope.allProductsInCart[product].Price;				
			}
			
			
			//set all variables.
				 
		}).error(function(error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");
		});
	}
	$scope.removeItemFromTheCart = function(itemId) {
		
		 $http({
			method : "POST",
			url : '/removeItemFromCart',
			data : {
				"itemId" : itemId,		
			}
		}).success(function(data) {
			console.log("inside success");
			console.log("Item is removed::");
			console.log(data);
			initialize();
			window.location.assign("#/cart");
			//set all variables.
				 
		}).error(function(error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");
			initialize();
		});	
	}
	
});