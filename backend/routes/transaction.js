const express = require("express");
const router = express.Router();

router.post("/add-income", addIncome);

module.exports = router;
