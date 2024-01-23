const IncomeSchema=require("../models/IncomeModole");

exports.addIncome=async(req,res)=>{
    const {title,amount,catagory,description,date}=req.body;

    const income=IncomeSchema({
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
    await income.save();
    res.status(200).json({
        message:'Income added'
    });
} catch (error) {
    res.status(500).json("Error");
}
console.log(income);
};

exports.getIncome=async(req,res)=>{
    try{
        const incomes=await IncomeSchema.find().sort({createdAt:-1})
        res.status(200).json(incomes); 
    }
    catch{
        res.status(500).json({message:"Server Error"});
    }
};

exports.deleteIncome=async(req,res)=>{
    const {id}=req.params;
    // console.log(req.params);
    IncomeSchema.findByIdAndDelete(id)
    .then((income)=>{
        res.status(200).json({message:"Income deleted!!"});
    })
    .catch((err)=>{
        res.status(500).json({message:"Server Error"});
    })
}
