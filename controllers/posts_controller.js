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
           req.flash('success','Post published')
           console.log('post saved to db')
      return res.redirect('back')
    });
    
}


module.exports.destroy=async(req,res)=>{

    try {
        let post=await  Post.findById(req.params.id)

if(post.user==req.user.id){
    post.remove()
    await Comment.deleteMany(post.user)
    req.flash('success','Post and its associated comments deleted')
        res.redirect('back')

    }else{
        return res.redirect('back')
    }
        
    } catch (error) {
        req.flash('error','error')
        console.log('Error',error)
    }


     //Below is Normal Callback version of destroy code

    // Post.findById(req.params.id,(err,post)=>{

    //         if(post.user==req.user.id){
    //             post.remove()
    //             Comment.deleteMany(post.user,(err)=>{
    //                 if(err){
    //                     console.log('error in deleting comments',err)
    //                     return 
    //                 }
    //                 res.redirect('back')

    //             })

    //         }else{
    //             return res.redirect('back')
    //         }

    // })
}

