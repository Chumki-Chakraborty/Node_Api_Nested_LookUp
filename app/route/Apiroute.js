const express=require('express')
const { AddUser, AllUser, AddMovie, AllMovie, LookUpMovie, AddReview, ReviewLookup } = require('../Controller/apicontroller')

const ApiRoute=express.Router()

ApiRoute.post('/adduser',AddUser)
ApiRoute.get('/alluser',AllUser)

ApiRoute.post('/addmovie',AddMovie)
ApiRoute.get('/allmovie',AllMovie)
ApiRoute.get('/movie/lookup',LookUpMovie)

ApiRoute.post('/addreview',AddReview)
ApiRoute.get('/review/lookup',ReviewLookup)
module.exports=ApiRoute