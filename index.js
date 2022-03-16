const express=require('express');
const app=express();

//use layouts for views
const expressLayouts=require('express-ejs-layouts')
app.use(expressLayouts)

//set routes
app.use('/',require('./routes'))

//set view engine for rendering views
app.set('view engine','ejs')
app.set('views','./views')






app.listen(3000,(err)=>{
    console.log('Server is up and running on port: 3000')
})