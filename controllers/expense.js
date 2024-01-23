const ExpenseSchema=require("../models/ExpenseMode");

exports.addExpense=async(req,res)=>{
    const {title,amount,catagory,description,date}=req.body;

    const expense=ExpenseSchema({
        title,
        amount,
        catagory,
        description,
        date
    });

    try {
    if(!title || !amount || !catagory ||!description || !date){
        return res.status(400).json({message:"Required field is empty!"});
    }
    if(amount<=0 ||!amount==='number'){
        return res.status(400).json({message:"Amount must be positive!!"});
    }
    await expense.save();
    res.status(200).json({
        message:'Expense added'
    });
} catch (error) {
    res.status(500).json("Error");
}
};

exports.getExpense=async(req,res)=>{
    try{
        const expense=await ExpenseSchema.find().sort({createdAt:-1})
        res.status(200).json(expense); 
    }
    catch{
        res.status(500).json({message:"Server Error"});
    }
};

exports.deleteExpense=async(req,res)=>{
    const {id}=req.params;
    // console.log(req.params);
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense)=>{
        res.status(200).json({message:"Expense deleted!!"});
    })
    .catch((err)=>{
        res.status(500).json({message:"Server Error"});
    })
}
