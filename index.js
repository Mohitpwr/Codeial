const express=require('express');
const app=express();

const db= require('./confiq/mongoose')
//use layouts for views
const expressLayouts=require('express-ejs-layouts')
app.use(expressLayouts)

// extract styles and scripts from subpages into layouts
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

app.use(express.static('./assets'))
//set routes
app.use('/',require('./routes'))

//set view engine for rendering views
app.set('view engine','ejs')
app.set('views','./views')






app.listen(3000,(err)=>{
    console.log('Server is up and running on port: 3000')
})