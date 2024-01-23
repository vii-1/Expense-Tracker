const { User } = require( "../models/User");
const bcrypt = require( "bcrypt");
const ErrorHandler = require( "../middleware/error");
const sendCookies = require( "../utilites/features");

exports.newProfile=async(req,res,next)=>{
    try{
    const {name,email,password}=req.body;
    let user= await User.findOne({email});
    if(user)return next(new ErrorHandler("User Already Exist",404));

    const hashpassword=await bcrypt.hash(password,10);

    user=await User.create({
        name,
        email,
        password:hashpassword,
    });

    sendCookies(user,res,"Registration Done",201);
    }
    catch(error){
        next(error);
    }

}
exports.login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email}).select("+password");
    
        if(!user) return next(new ErrorHandler("Envalid Email or password",400)); 
        const isMatch=await bcrypt.compare(password,user.password);
    
        if(!isMatch) return next(new ErrorHandler("Invaild Email or password",400)); 
        
        sendCookie(user,res,`Welcome Back,${user.name}`,200)
    } catch (error) {
        next(error);
    }

}
exports.logout=(req,res,next)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?"false":"true",
    }).json({
        success:true,
        user:req.user
    })
};
