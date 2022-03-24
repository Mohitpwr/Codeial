const { findOne } = require('../models/user')
const User=require('../models/user')

module.exports.profile=(req,res)=>{
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
}


module.exports.signIn=(req,res)=>{
    if(req.isAuthenticated()){
        return res.render('user_profile')
    }
      return res.render('user_sign_in')
}

module.exports.signUp=(req,res)=>{
    if(req.isAuthenticated()){
        return res.render('user_profile')
    }
    return res.render('user_sign_up')
}


module.exports.create=(req,res)=>{
    console.log(req.body)
if(req.body.password!=req.body.confirm_password){
    console.log('enter correct confirm password')
    return res.redirect('back')
}

User.findOne({
    email:req.body.email
     },(err,user)=>{
           if(err){
               console.log("error in sign up")
               return
           }        
              if(!user){
                  User.create(req.body,(err,user)=>{
                      if(err){
                         console.log('error in creation of sign up',err)
                         
                      }
                      return res.redirect('/users/signIn')
                  })
              }else{
                  return res.redirect('back')
              }
   }) 



}

//sign in and create a session for the user

module.exports.createSession=(req,res)=>{
        
           res.redirect('/')

}

module.exports.destroySession=(req,res)=>{
    
    req.logout()  //provided by passport js
    res.redirect('/')
 

}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}