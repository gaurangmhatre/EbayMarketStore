
products.controller('productsForAuction', function($scope, $filter, $http) {

	
		$scope.unexpected_error = true;

		console.log("inside productsForAuction controller");
	
		//console.log("userId:: " + $scope.userId)
	
		
		$http({
			method : "POST",
			url : '/getAllProductsForAuction',//change the method to get 10 items at a time.
			data : {
				
			}
		}).success(function(data) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data);
			
			$scope.allProductsForAuction = data.results;
			
			//set all variables.
				 
		}).error(function(error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");
		});
		
		
		
		$scope.addBidOnProduct = function(ItemId,BidAmount) {
			
			console.log("Selected ItemId : "+ItemId);
			

			$http({
				method : "POST",
				url : '/addBidOnProduct',//change the method to get 10 items at a time.
				data : {
					"ItemId" : ItemId,
					"BidAmount" : BidAmount
				}
			}).success(function(data) {
				console.log("inside success");
				console.log("data is ::");
				console.log(data);
			
				window.location.assign("/products");
				//set all variables.
					 
			}).error(function(error) {
				console.log("inside error");
				console.log(error);
				$scope.unexpected_error = false;
				$scope.invalid_login = true;
				$window.alert("unexpected_error");
			});	
		}
		
});