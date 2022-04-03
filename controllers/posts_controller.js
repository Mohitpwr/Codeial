const Post=require('../models/post')
const Comment=require('../models/comment')
const Like = require('../models/like');


module.exports.create=async (req,res)=>{
 
   let post= await Post.create({
        content:req.body.content,
        user:req.user._id
    });
    

    if(req.xhr){
         // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
    post = await post.populate('user', 'name')
        return  res.status(200).json({
            data: {
                post: post
            },
            message: "Post created!"
        });
    }
        if(err){
            console.log("Error in saving post")
            return 
           }
           req.flash('success','Post published')
           console.log('post saved to db')
      return res.redirect('back')

    
}


module.exports.destroy=async(req,res)=>{

    try {
        let post=await  Post.findById(req.params.id)

if(post.user==req.user.id){
     // CHANGE :: delete the associated likes for the post and all its comments' likes too
     await Like.deleteMany({likeable: post, onModel: 'Post'});
     await Like.deleteMany({_id: {$in: post.comments}});
    post.remove()
    await Comment.deleteMany(post.user)

    if (req.xhr){
        return res.status(200).json({
            data: {
                post_id: req.params.id
            },
            message: "Post deleted"
        });
    }
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

