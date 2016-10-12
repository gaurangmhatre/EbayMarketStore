var mysql = require('./mysql');
//var bcrypt = require('./bCrypt.js')


exports.signup=function (req,res) {
	getAllAuctionResults();
	res.render('signup', { validationMessage: 'Empty Message'});
};

exports.signin = function(req,res){
	getAllAuctionResults();
	res.render('signin',{validationMessage:'Empty Message'});
};


exports.checklogin= function(req,res) {

	console.log("in checklogin");

	var email = req.param("email");
	var password = req.param("password");
	
	console.log("email :: " + email);
	console.log("password :: " + password);

	if(email != '') {
		var checkLoginQuery = "select UserId from user where EmailId = '" + email + "' and Password = '" + password + "'";
		console.log("Query:: " + checkLoginQuery);

		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
			}
			else {
				if(results.length > 0) {
					//if(bcrypt.compareSync(password,results[0].password)) {
						console.log("Successful Login");
						console.log("UserId :  " + results[0].UserId);
						//Assigning the session
						req.session.email = email;
						req.session.userid = results[0].UserId;
						console.log("Session Initialized with email : " + req.session.email);
						console.log("userid :: " + req.session.userid);
						json_responses = {"statusCode" : 200};
						res.send(json_responses);
					}
					//else {
					//	console.log("Invalid Password");
					//	json_responses = {"statusCode" : 401};
					//	res.send(json_responses);
					//}
				//}
				else {
					console.log("Invalid Login");
					json_responses = {"statusCode" : 401};
					res.send(json_responses);
				}
			}
		}, checkLoginQuery);
	}
};


exports.afterSignup = function(req,res){// load new user data in database
	console.log("In aftersignup");

	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var email = req.param("email");
	var password = req.param("password");
	var contact = req.param("contact");//not added in database
	var location = req.param("location");
	var creditCardNumber = req.param("creditCardNumber");
	var dateOfBirth = req.param("dateOfBirth");
	
	console.log("firstname :: " + firstname);
	console.log("lastname :: " + lastname);
	console.log("email :: " + email);
	console.log("password :: " + password);
	console.log("contact :: " + contact);
	console.log("location : " + location);
	console.log("creditCardNumber : " + creditCardNumber);
	console.log("dateOfBirth :: " +dateOfBirth);
	//var hash = bcrypt.hashSync(password);

	var query = "INSERT INTO user (FirstName, LastName, EmailId, Password, Address, CreditCardNumber,DateOfBirth) VALUES ('" + firstname + "','" + lastname + "','" + email + "','" + password + "','" + location + "','" + creditCardNumber + "','"+dateOfBirth+"')";
	console.log("Query:: " + query);

	mysql.storeData(query, function(err, result){
		//render on success
		if(!err){
			console.log('Valid SignUp!');
			res.send("true");
		}
		//render or error
		else{
			console.log('Invalid SingUp!');
			res.send("false");
		}
	});	
};

exports.checksignup = function(req,res){ //check if email ID is valid or not
	console.log("In check signup .");
	
	//request parameters
	var email = req.param("email");

	if(email!='') {
		//check if email already exists
		var checkEmailQuery =  "select EmailId from user where EmailId = '" + email + "'";
		console.log("Query is :: " + checkEmailQuery);
	
		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
			}
			else {
				if(results. length > 0) {
					console.log("Email exists!");
					res.send("true");
				}
				else {
					console.log("Email Doesn't exists");
					res.send("false");
				}
			}
		}, checkEmailQuery); 
	}
};


function getAllAuctionResults(){
	console.log("In GetAllAuction method.");
	
	var getAllItemsWithCompletedAction =  "select ItemId from item as i where i.IsBidItem =1  and i.AuctionEndDate < now() and sold = 0";
	console.log("Query is :: " + getAllItemsWithCompletedAction);

	mysql.fetchData(function(err,results) {
		if(err) {
			throw err;
		}
		else {
			if(results.length > 0) {
				console.log("Items exists!");
				for(result in results)
				{
					addAuctionWinnerToTheList(results[result].ItemId);	
					itemIsSold(results[result].ItemId);
				}	
			}
			else {
				console.log("Item doesn't exist");
				//res.send("false");
			}
		}
	}, getAllItemsWithCompletedAction); 
}


function itemIsSold(ItemId) {

	console.log("Inside itemIsSold flag.");
		
		var updateSoldItemFlagQuery = "update Item set sold = 1 where ItemId = "+ItemId;

		console.log("Query:: " + updateSoldItemFlagQuery);

		mysql.storeData(updateSoldItemFlagQuery, function(err, result){
			//render on success
			if(!err){
				console.log('Sold flag updated for Item:'+ItemId);
			}
			else{
				console.log('ERROR! Insertion not done for auction results.');
				throw err;
			}
		});
};

function addAuctionWinnerToTheList(ItemId) {

	console.log("Inside addAuctionWinnerToTheList method.");
	
	var addAuctionWinnerToTheListQuery = "INSERT INTO `ebay`.`auctionwinners`(`WinnerId`,`ItemId`,`IsPaymentDone`)(select b.BidderId, b.ItemId, 0 as IsPaymentDone from bidderlist as b where ItemId = "+ItemId+" and b.BidAmount = (	select max(b.BidAmount)	from bidderlist as b left join item as i	on b.ItemId=i.ItemId	where i.IsBidItem =1  and i.AuctionEndDate < now() and i.ItemId="+ItemId+"));";

	console.log("Query:: " + addAuctionWinnerToTheListQuery);

	mysql.storeData(addAuctionWinnerToTheListQuery, function(err, result){
		//render on success
		if(!err){
			console.log('New bidder successfully added to winners list! for Item:'+ItemId);
				
				//res.send(json_responses);
		}
		else{
			console.log('ERROR! Insertion not done for auction results.');
			throw err;
		}
	});
};

exports.signout = function(req,res){

	var userId = req.session.userid;
	addLastLogin(userId);

	req.session.destroy();

	json_responses = {"statusCode" : 200};
	res.send(json_responses);
}


function addLastLogin(userId) {

	var addItemToSoldTableQuery = "UPDATE user	SET LastLoggedIn = NOW() WHERE UserId = "+userId+";";
	console.log("Query:: " + addItemToSoldTableQuery);

	mysql.storeData(addItemToSoldTableQuery, function(err, result){
		//render on success
		if(!err){
			console.log('last Login for userId = '+userId+" is added.");
		}
		else{
			console.log('ERROR! while adding current login.');
			throw err;
		}
	});
}






