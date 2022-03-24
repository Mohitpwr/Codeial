const Post=require('../models/post')
const Comment=require('../models/comment')
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


module.exports.destroy=(req,res)=>{
    Post.findById(req.params.id,(err,post)=>{

            if(post.user==req.user.id){
                post.remove()
                Comment.deleteMany(post.user,(err)=>{
                    if(err){
                        console.log('error in deleting comments',err)
                        return 
                    }
                    res.redirect('back')

                })

            }else{
                return res.redirect('back')
            }

    })
}

