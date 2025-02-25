const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProductDetail);

router.get("/cart", shopController.getCart);

router.post("/add-to-cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteItem);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
