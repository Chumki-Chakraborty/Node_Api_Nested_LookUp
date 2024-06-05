const mongoose=require('mongoose')
const schema=mongoose.Schema

const Userschema=new schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:1
    }
})

const UserModel=mongoose.model('user',Userschema)
module.exports=UserModel