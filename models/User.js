const { default: mongoose } = require("mongoose")


const Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    CreatedAt:{
        type:Date,
        default:Date.now(),
    },
})

module.exports=mongoose.model("User",Schema);