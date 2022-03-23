const Post=require('../models/post')

module.exports.create=(req,res)=>{

    Post.create({
        content:req.body.content,
        user:req.user._id
    },(err,post)=>{
        if(err){
            console.log("Error in saving post")
            return 
           }
           console.log('post saved to db')
      return res.redirect('back')
    });
    
}

