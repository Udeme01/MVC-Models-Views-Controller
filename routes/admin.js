const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.get("/add-product", adminController.getAddProductPage);

router.get("/edit-product/:productId", adminController.getEditProductPage);

router.get("/adminProducts", adminController.getAdminProducts);

router.post("/add-product", adminController.getPostProducts);

router.post("/edit-product", adminController.postEditProductPage);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
