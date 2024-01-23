const { addIncome, getIncome, deleteIncome } = require('../controllers/Income');
const { addExpense, deleteExpense, getExpense } = require('../controllers/expense');

const router=require('express').Router();

router.post('/add-income',addIncome)
    .get('/get-incomes',getIncome)
    .delete('/delete-income/:id',deleteIncome);
router.post('/add-expense',addExpense)
    .get('/get-expense',getExpense)
    .delete('/delete-expense/:id',deleteExpense);

module.exports=router