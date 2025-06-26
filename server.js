const app=require('express')
const server = app()

const mongoose=require('mongoose')
require('dotenv').config();
const MongoUri=process.env.Mongo_Uri;
mongoose.connect(MongoUri)
.then(()=>console.log('connected to mongodb atlas'))
.catch((error)=>console.error('mondb connection error',error))

server.get('/',(req,res)=>{
    res.end("hello from express");
})
server.listen(3050)