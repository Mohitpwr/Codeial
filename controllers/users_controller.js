module.exports.profile=(req,res)=>{
    res.render('user_profile',{
        title:' Codieal/Profile'
    })
}


module.exports.signIn=(req,res)=>{
      return res.render('user_sign_in')
}

module.exports.signUp=(req,res)=>{
    return res.render('user_sign_up')
}