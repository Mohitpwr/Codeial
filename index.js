const express=require('express');
const app=express();
const cookieParser=require('cookie-parser')
const db= require('./confiq/mongoose')

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./confiq/passport-local-strategy');
const passportJWT = require('./confiq/passport-jwt-strategy');
const passportGoogle = require('./confiq/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware=require('node-sass-middleware')
const flash=require('connect-flash')
const customMiddleware=require('./confiq/Middleware')

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./confiq/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded())
app.use(cookieParser())
//use layouts for views
const expressLayouts=require('express-ejs-layouts')
app.use(expressLayouts)

// extract styles and scripts from subpages into layouts
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


app.use(express.static('./assets'))
//for making upload files accessible in views or browser
app.use('/uploads',express.static(__dirname+'/uploads'))



//set view engine for rendering views
app.set('view engine','ejs')
app.set('views','./views')

app.use(session({
    name:'codieal',
    //todo ...change the secret key before deployment in production mode
    secret:'secretkey',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*1000)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost:27017/Codeial',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)
app.use(flash())
app.use(customMiddleware.setFlash)

//set routes
app.use('/',require('./routes'))





app.listen(8000,(err)=>{
    console.log('Server is up and running on port: 8000')
})