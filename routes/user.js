const {Express} = require("express");
const { login, logout, newProfile } =require( "../controllers/user");

const router=require('express').Router();

router.post("/new",newProfile);
router.post("/login",login);
router.get("/logout",logout);


module.exports=router;