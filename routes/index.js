const express=require('express')

const router=express.Router()
console.log("router loaded")

const homeController=require('../controllers/home_controller')




 router.get('/',homeController.home)
 router.use('/users',require('./users'))
 router.use('/posts',require('./posts'))
  router.use('/comments', require('./comments'));

  router.use('/api', require('./api'));
  router.use('/reset-password',require('./reset_password'));
  router.use('/likes', require('./likes'));

module.exports=router