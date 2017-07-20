// app/routes.js
module.exports = function(app, passport) {
	// route middleware to make sure
	
app.get('/isLoggedIn',authMiddleware ,function(req,res){
	
		var user ={
			"id":req.user.ID,
			"username":req.user.USERNAME,
			"email":req.user.EMAIL,
			"rol":req.user.ROL
		};
		console.log(user);
		return res.status(200).json(user);

});
function authMiddleware(req,res,next){
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){	
		
		return next();
		
	}

	// if they aren't redirect them to the home page
	return res.redirect('/#!/login');
}

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	/*app.route('/#!/dashboard')
	   .get(function(req, res) {
		console.log("entro en get de Login")
		res.redirect('/#!/dashboard');
	});*/


/*	app.get('/isLoggedIn',function(req,res){
		console.log("entro en get de isLoggedIn")
		// if user is authenticated in the session, carry on
		if (req.isAuthenticated()){	
			console.log(req.user);
			return req.user;
		}
		// if they aren't redirect them to the home page
		res.redirect('/#!/login');

	});*/
	

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	
	app.post('/login',passport.authenticate('local-login', {
            successRedirect : '/#!/dashboard', // redirect to the secure profile section
            failureRedirect : '/#!/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}) ,function(req, res) {

		console.log("entro en post de Login")
		/*passport.authenticate('local-login', {
            successRedirect : '/#!/dashboard', // redirect to the secure profile section
            failureRedirect : '/#!/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		});*/

		 if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
           
             // res.redirect('/#!/dashboard');

		// render the page and pass in any flash data if it exists
		// res.render('login.ejs', { message: req.flash('loginMessage') });
	});


	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	/*app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		// res.render('signup.ejs', { message: req.flash('signupMessage') });
	});*/


	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/#!/login', // redirect to the secure profile section
		failureRedirect : '/#!/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	/*app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});*/

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('#!/logout', function(req, res) {
		req.logout();
		res.redirect('/#!/');
	});
};

