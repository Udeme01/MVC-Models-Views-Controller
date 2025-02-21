const Product = require("../models/product");

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.getPostProducts = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = parseFloat(req.body.price);
  const description = req.body.description;

  console.log("Received Data:", req.body);

  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("admin/adminProducts", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/adminProducts",
    });
  });
};
