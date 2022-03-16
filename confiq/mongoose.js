const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/Codeial')

const db=mongoose.connection

console.log('connected to database Codeial')
module.exports=db