userProfile.controller('activityController', function($scope,$http) {
	// create a message to display in our view
	$scope.invalid_login = true;
	$scope.unexpected_error = true;

		console.log("inside user activity controller");
			
		$http({
			method : "POST",
			url : '/getAllUserDirectBuyingActivities',
			data : {
				
			}
		}).success(function(data) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data);
			
			
			$scope.allItemsInActivity= data
			
			
			//set all variables.
				 
		}).error(function(error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");
		});

	
		$http({
			method : "POST",
			url : '/getAllSoldProducts',
			data : {
				
			}
		}).success(function(data1) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data1);
			
			
			$scope.allSoldProducts= data1;
			
			
			//set all variables.
				 
		}).error(function(error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");
		});

	
		
		$http({
			method : "POST",
			url : '/getAllUserBiddingActivity',
			data : {
				
			}
		}).success(function(data1) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data1);
			
			
			$scope.AllUserBiddingActivity= data1;
			
			
			//set all variables.
				 
		}).error(function(error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");
		});

	
});
