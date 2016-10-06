var mysql = require('./mysql');

exports.accountdetails = function(req,res){
	
	res.render('userProfile',{validationMessgae:'Empty Message'});

};


exports.getUserAccountDetails = function(req,res){
	
	console.log("userId: "+req.session.userid);
	
	var userId = req.session.userid;
	
	if(userId != '') {
		var getUserAccountDetailsQuery = "select UserId,FirstName,LastName,EmailId,Password,Address,CreditCardNumber from user where UserId= '" + userId+"'";
		console.log("Query:: " + getUserAccountDetailsQuery);

		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
			}
			else {
				if(results.length > 0) {
						console.log("Successful got the user data");
						console.log("UserId :  " + userId);					
						
						json_responses = {"UserId" : results[0].UserId
											,"FirstName": results[0].FirstName
											,"LastName": results[0].LastName
											,"EmailId":results[0].EmailId
											,"Address":results[0].Address
											,"CreditCardNumber":results[0].CreditCardNumber
											};
						}
				else{
						res.send(json_responses);
						console.log("Invalid string.");
						json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}	
			
		}, getUserAccountDetailsQuery);
	}	
	
};


exports.getAllProductsInCart = function(req,res){
	console.log("inside get All Products from cart for user: "+req.session.userid);
	
	var userId = req.session.userid;
	
	if(userId != '') {
		var getUserCartItemsQuery = "select uc.UserCartId, uc.ItemId, i.ItemName, i.ItemDescription, i.ItemTypeId ,i.Price from ebay.usercart uc join ebay.item i on uc.ItemId =  i.itemId where uc.UserId = '" + userId +"'";
		console.log("Query:: " + getUserCartItemsQuery);

		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
			}
			else {
				if(results.length > 0) {
						console.log("Successful got the user cart data");
						
						json_responses = results;
						}
				else{
						res.send(json_responses);
						console.log("Invalid string.");
						json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}	
			
		}, getUserCartItemsQuery);
	}	
};

exports.removeItemFromCart = function(req,res){
	console.log("Inside removeItemFromCart for user: "+req.session.userid);
	
	var userId = req.session.userid;
	var itemId = req.param("itemId");
	
	if(userId != '') {
		var removeItemFromCartQuery = "delete from usercart where UserId = "+userId+" and ItemId = "+itemId;
		console.log("Query:: " + removeItemFromCartQuery);

		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
			}
			else {
				if(results.length > 0) {
						console.log("Successful removed item from the cart");
						
						json_responses = results;
						}
				else{
						res.send(json_responses);
						console.log("Invalid string.");
						json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}	
			
		}, removeItemFromCartQuery);
	}
};

exports.buyItemsInCart = function(req,res)
{
/*
 * 1. Get all items from cart table by userid
 * 2. push the items to sold table.
 * 3. empty cart.
 * 4. Qty -= 1 in items table. 
 */
	
	var userId = req.session.userid;
	/*var dateAdded = "2016-12-04 05:45:10";
	*/
	var creditCardNumber = req.param("CreditCardNumber");
	
	if(userId != '') {
		var getAllCartItemsQuery = "Select UserCartId,UserId,ItemId,Qty from usercart where UserId ="+userId;
		console.log("Query:: " + getAllCartItemsQuery);

		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
			}
			else {
				if(results.length > 0) {
						console.log("Got all the items for userId: "+ userId);
						
						//insert item into sold table.
						for(result in results)
						{
							AddItemToSoldTable(results[result].ItemId,userId,creditCardNumber);
							updateItemQty(results[result].ItemId);
							removingItemFromCart(userId,results[result].ItemId);
						}
						
						json_responses = results;
				}
				else{
						res.send(json_responses);
						console.log("No items in cart.");
						json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}	
			
		}, getAllCartItemsQuery);
	}

	
}

function AddItemToSoldTable(ItemId,userId,creditCardNumber) {

	console.log("Inside addItemTOSoldTable method.")
	
	var addItemToSoldTableQuery = "INSERT INTO sold(ItemId,BuyerId,SoldDate,Qty,PaymentByCard)VALUES("+ItemId+","+userId+",NOW(),1,'"+creditCardNumber+"');";
	console.log("Query:: " + addItemToSoldTableQuery);

	mysql.storeData(addItemToSoldTableQuery, function(err, result){
		//render on success
		if(!err){
			console.log('New item successfully bought by user!');
				json_responses = {
					"statusCode" : 200
				}
				//res.send(json_responses);
		}
		else{
			console.log('ERROR! Insertion not done');
			throw err;
		}
	});
}

function updateItemQty(ItemId) {

	console.log("Inside updateItemQty method.")
		
	var updateItemQtyQuery = "UPDATE ebay.item SET Qty=Qty-1, ModificationDate= NOW() WHERE ItemId = "+ItemId;
	console.log("Query:: " + updateItemQtyQuery);


	mysql.storeData(updateItemQtyQuery, function(err, result){
		//render on success
		if(!err){
			console.log('Item Qty updated!');
				json_responses = {
					"statusCode" : 200
				}
				//res.send(json_responses);
		}
		else{
			console.log('ERROR! Insertion not done');
			throw err;
		}
	});
}

function removingItemFromCart(userId,ItemId) {

	console.log("Inside updateItemQty method.")
		
	var RemovingItemFromCartQuery = "delete from usercart where UserId ="+userId+" and ItemId = "+ItemId+";";
	console.log("Query:: " + RemovingItemFromCartQuery);


	mysql.deleteData(RemovingItemFromCartQuery, function(err,results) {
		if(err) {
				console.log("Error in deleteData");
				console.log(err);
				throw err;
			}
		else {
			console.log("successfully removed items from the cart");
			console.log(results);
			console.log(results.affectedRows);
			if(results.affectedRows >0) {
				json_responses = {
					"statusCode" : 200,
					"results" : results
				}
				//res.send(json_responses);
			}
			else{
				json_responses = {
					"statusCode" : 401
				}
				//res.send(json_responses);
			}
		}
	});
}

//select u.Solddate, u.Qty, i.ItemName, i.ItemDescription,i.Price,seller.FirstName from sold as u left join item as i on u.ItemId=i.ItemId left join user as seller on i.SellerId=seller.UserId


exports.getAllUserDirectBuyingActivities= function(req,res){
	console.log("inside getAllUserDirectBuyingActivities for user: "+req.session.userid);
	
	var userId = req.session.userid;
	
	if(userId != '') {
		var getAllUserDirectBuyingActivitiesQuery = "select u.Solddate, u.Qty, i.ItemName, i.ItemDescription,i.Price,seller.FirstName from sold as u left join item as i on u.ItemId=i.ItemId left join user as seller on i.SellerId=seller.UserId where u.BuyerId = "+userId;
		console.log("Query:: " + getAllUserDirectBuyingActivitiesQuery);

		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
			}
			else {
				if(results.length > 0) {
						console.log("Successful got the user activity data");
						
						json_responses = results;
						}
				else{
						res.send(json_responses);
						console.log("Invalid string.");
						json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}	
			
		}, getAllUserDirectBuyingActivitiesQuery);
	}	
};
