
const User=require('../models/user')
const fs=require('fs')
const path=require('path')

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
        req.flash('success',"Logged in Successfully")
           res.redirect('/')

}

module.exports.destroySession=(req,res)=>{
    
    req.logout()  //provided by passport js
    req.flash('success',"Logged out Successfully")
    res.redirect('/')
 

}

module.exports.update = async (req, res)=>{
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
       try {
           let user=await  User.findById(req.params.id)
       User.uploadedAvatar(req,res,(err)=>{
           if(err){
               console.log('****Multer error',err)
           }
                console.log(req.body.name)
                console.log(req.file)

             user.name= req.body.name;
             user.email= req.body.email;

             if(req.file){

                if(user.avatar){
                 fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                }
                 //saving path of uploaded file into the avatar field of user
                 user.avatar=User.avatarPath+'/'+req.file.filename;
             }
             user.save()
             return res.redirect('back')
       })
       } catch (error) {
              req.flash('error','error')
        console.log('Error',error)
       }
    }else{

    }
}