const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.get("/add-product", adminController.getAddProductPage);

router.get("/adminProducts", adminController.getAdminProducts);

router.post("/add-product", adminController.getPostProducts);

module.exports = router;
