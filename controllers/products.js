const Product = require("../models/product");

exports.getAddProductPage = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.getPostProducts = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("shop", { prods: products, pageTitle: "My Shop", path: "/" });
  });
};
