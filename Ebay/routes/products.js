var mysql = require('./mysql');


exports.getProductsPage = function(req,res){
	res.render('products',{validationMessage:'Empty Messgage'});
};

exports.getAllProducts = function(req,res){
	console.log("In getAllProducts.");
		
		var getAllProductQuery = "select ItemId, ItemName,ItemDescription,ItemTypeId,SellerId,Price,Qty,DateAdded,ModificationDate,IsBidItem, sold from item where IsBidItem=0 and Qty>0";
		console.log("Query:: " + getAllProductQuery);

		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
			}
			else {
				if(results.length > 0) {
						json_responses = {"statusCode" : 200,
											"results" : results};
						
						res.send(json_responses);
				}
				else {
					console.log("No items to display");
					json_responses = {"statusCode" : 401};
					res.send(json_responses);
				}
			}
		}, getAllProductQuery );
};

exports.getAllProductsForAuction = function(req,res){
	console.log("In getAllProductsForAuction.");

		var getAllProductForAuctionQuery = "select i.ItemId, i.ItemName,i.ItemDescription,i.ItemTypeId,i.SellerId,i.Price,i.Qty,i.DateAdded,i.ModificationDate,i.IsBidItem,i.sold, max(b.BidAmount) as MaxBidAmount from item as i left join bidderList as b on i.ItemId = b.ItemId  where i.IsBidItem=1 group by i.ItemId, i.ItemName,i.ItemDescription,i.ItemTypeId,i.SellerId,i.Price,i.Qty,i.DateAdded,i.ModificationDate,i.IsBidItem, i.sold";
		console.log("Query:: " + getAllProductForAuctionQuery);

		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
			}
			else {
				if(results.length > 0) {
						json_responses = {"statusCode" : 200,
											"results" : results};
						
						res.send(json_responses);
				}
				else {
					console.log("No items to display");
					json_responses = {"statusCode" : 401};
					res.send(json_responses);
				}
			}
		}, getAllProductForAuctionQuery );
};




exports.userAddToCart = function(req,res){
	console.log("In userAddToCart method.");
	
	var ItemId = req.param("ItemId");
	var Qty = 	 req.param("Qty");
	var UserId =  req.session.userid;
	
	console.log("Add to cart for: "+UserId+" itemId: "+ItemId+" Qty:"+Qty);
	
	var userAddToCartQuery = "INSERT INTO usercart(`UserId`,`ItemId`,`Qty`)VALUES("+UserId+","+ItemId+","+Qty+");";
	console.log("Query:: " + userAddToCartQuery);

	mysql.fetchData(function(err,results) {
		if(err) {
			throw err;
		}
		else {
			if(results.length > 0) {
					json_responses = {"statusCode" : 200,
										"results" : results};
					
					res.send(json_responses);
			}
			else {
				console.log("No items to display");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}
	}, userAddToCartQuery );	
};


exports.addBidOnProduct = function(req,res){
	console.log("In addBidOnProduct method.");
	
	var ItemId = req.param("ItemId");
	var BidAmount = req.param("BidAmount");
	var UserId =  req.session.userid;

	
	var addBidOnProductQuery = "INSERT INTO bidderlist(BidderId,ItemId,BidAmount,BidTime)VALUES("+UserId+","+ItemId+","+BidAmount+",NOW());";
	console.log("Query:: " + addBidOnProductQuery);

	mysql.fetchData(function(err,results) {
		if(err) {
			throw err;
		}
		else {
			if(results.length > 0) {
					json_responses = {"statusCode" : 200,
										"results" : results,
										"BidAmount":0};
					
					res.send(json_responses);
			}
			else {
				console.log("No items to display");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}
	}, addBidOnProductQuery );	
	
	
};

exports.getItemType = function(req,res){
	console.log("Inside getItemType Method.");
	
	var getItemTypeQuery = "SELECT ItemTypeId,ItemType FROM itemtype;";
	console.log("Query:: " + getItemTypeQuery);

	mysql.fetchData(function(err,results) {
		if(err) {
			throw err;
		}
		else {
			if(results.length > 0) {
					console.log("Successful got All the ItemTypes.");
					
					json_responses = results;
			}
			else{
					res.send(json_responses);
					console.log("Invalid string.");
					json_responses = {"statusCode" : 401};
			}
			res.send(json_responses);
		}	
		
	}, getItemTypeQuery);
	
};


exports.addProduct = function(req,res){
	console.log("Inside addProduct.");
	
	var SellerId = req.session.userid;
	
	var ItemName = req.param("ItemName");
	var ItemDescription = req.param("ItemDescription");
	var ItemTypeId = req.param("ItemTypeId");
	var Price = req.param("Price");
	var Qty = req.param("Qty");
	var IsBidItem = req.param("IsBidItem");
	/*var DateAdded = "2016-12-04 05:45:10";
	var ModificationDate = "2016-12-04 05:45:10";*/
	var Sold = 0;
	//ItemName,ItemDescription,ItemTypeId,Price,Qty,IsBidItem
	var insertNewProductQuery = "INSERT INTO item (ItemName,ItemDescription,ItemTypeId,SellerId,Price,Qty,DateAdded,ModificationDate,IsBidItem,Sold) VALUES ('"+ItemName+"','"+ItemDescription+"',"+ItemTypeId+","+SellerId+","+Price+","+Qty+",NOW(),NOW(),"+IsBidItem+","+Sold+")";
	console.log("Query:: " + insertNewProductQuery);

	mysql.fetchData(function(err,results) {
		if(err) {
			throw err;
		}
		else {
			if(results.length > 0) {
					console.log("Successful added the item to Items table.");
					
					json_responses = results;
			}
			else{
					res.send(json_responses);
					console.log("Invalid string.");
					json_responses = {"statusCode" : 401};
			}
			res.send(json_responses);
		}	
		
	}, insertNewProductQuery);
		
};