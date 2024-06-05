const mongoose=require('mongoose')

const Schema=mongoose.Schema

const MovieSchema=new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    moviename:{
        type:String,
        required:true
    },status:{
        type:String,
        default:1
    }
})
const MovieModel=mongoose.model('movie',MovieSchema)
module.exports=MovieModel