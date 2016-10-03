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
											,"Address":results[0].Adderess
											,"CreditCarddetails":results[0].CreditCarddetails
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