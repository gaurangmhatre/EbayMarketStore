var mysql = require('./mysql');
//var bcrypt = require('./bCrypt.js')


exports.signup=function (req,res) {
	res.render('signup', { validationMessage: 'Empty Message'});
};

exports.signin = function(req,res){
	
	res.render('signin',{validationMessgae:'Empty Message'});
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
	
	
}

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
	
}


