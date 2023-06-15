const express = require("express");
const { addTransaction, getAllTransaction,editTransaction ,deleteTransaction} = require("../controllers/transactionController");

const router = express.Router();

// post r
router.post("/add-transactions" ,addTransaction)
// edit
router.post("/edit-transactions" ,editTransaction)
// delete
router.post("/delete-transactions" ,deleteTransaction)

// get
router.post("/get-transactions",getAllTransaction)


module.exports = router;    