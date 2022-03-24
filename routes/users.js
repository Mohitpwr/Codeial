const express=require('express')
const router=express.Router()
const passport=require('passport')
const userController=require('../controllers/users_controller')

router.get('/profile/:id',passport.checkAuthentication,userController.profile)
router.get('/signIn',userController.signIn)
router.get('/signUp',userController.signUp)
router.post('/create',userController.create)
router.post('/create-session',passport.authenticate(
                        'local',
                        {failureRedirect:'/users/signIn'}),userController.createSession)

 router.get('/signOut',userController.destroySession)    
 
 router.post('/update/:id', passport.checkAuthentication, userController.update);
module.exports=router