exports.signup=function (req,res) {
	res.render('signup', { validationMessage: 'Empty Message'});
};

exports.signin = function(req,res){
	
	res.render('signin',{validationMessgae:'Empty Message'});
};