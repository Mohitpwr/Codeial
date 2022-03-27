const Post=require('../models/post')
const User=require('../models/user')
module.exports.home=async(req,res)=>{
    // populate the user of each post
    try {
        let posts=await Post.find({}).sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })

    let users=await  User.find({})

    return res.render('home', {
        title: "Codeial | Home",
        posts:  posts,
        all_users: users
    });
        
    } catch (error) {
        console.log("Error",error)
        return
    }
    
    //we converted below code into async await code written above
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    // .exec(function(err, posts){
    //     User.find({}, function(err, users){
    //         return res.render('home', {
    //             title: "Codeial | Home",
    //             posts:  posts,
    //             all_users: users
    //         });
    //     });
    // })
}