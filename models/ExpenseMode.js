const { default: mongoose } = require("mongoose")

const ExpenseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxlength:50,
    },
    amount:{
        type:Number,
        required:true,
        maxlength:20,
        trim:true,
    },
    type:{
        type:String,
        default:"expense",
    },
    date:{
        type:Date,
        required:true,
        trim:true
    },
    catagory:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        maxlength:20,
        trim:true,
    },
},{timestamps:true});

module.exports=mongoose.model('Expense',ExpenseSchema);