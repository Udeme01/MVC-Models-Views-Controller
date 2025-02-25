const Product = require("../models/product");

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.getPostProducts = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = parseFloat(req.body.price);
  const description = req.body.description;

  // console.log("Received Data:", req.body);

  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getEditProductPage = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;

  Product.findSingleProductById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
  // res.render("admin/edit-product", {
  //   pageTitle: "Edit Product",
  //   path: "/admin/edit-product",
  //   editing: editMode,
  // });
};

exports.postEditProductPage = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProducts = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDescription
  );
  updatedProducts.save();
  res.redirect("/admin/adminProducts");
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/adminProducts");
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
