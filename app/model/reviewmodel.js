const mongoose=require('mongoose')

const Schema=mongoose.Schema

const ReviewSchema=new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    movie_id:{
        type:Schema.Types.ObjectId,
        ref:'movie',
        required:true
    },
    review:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:1
    }
})
const moviemodel=mongoose.model('review',ReviewSchema)
module.exports=moviemodel