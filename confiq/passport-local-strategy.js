const passport =require('passport')
const User=require('../models/user')
const LocalStrategy=require('passport-local').Strategy


passport.use(new LocalStrategy({usernameField:'email'},
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user || user.password !=password){
            console.log('invalid username/password')
            return done(null, false);
             }
       // if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
});     

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
      if(err){
          console.log('Error in finding user --> Passport');
          return done(err);
      }

      return done(null, user);
  });
});

//check if the user is authenticated
passport.checkAuthentication=(req,res,next)=>{
//if the user is signed in,then pass on the request to next function(controller action)
          if(req.isAuthenticated()){
              return next()
            }
            //if user is not signed in
            return res.redirect('/users/signIn')
             }

     passport.setAuthenticatedUser=(req,res,next)=>{
               if(req.isAuthenticated()){
                 res.locals.user=req.user;
               }
               next();

      }

  module.exports=passport