const express=require('express')
const app=express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const dotenv=require('dotenv')
dotenv.config()
const Mongodb_connection=require('./app/config/database')
Mongodb_connection()

// ApiRoute
const ApiRoute=require('./app/route/Apiroute')
app.use(ApiRoute)

const port=9999
app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`);
})
