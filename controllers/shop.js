const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/product-list",
    });
  });
};

exports.getProductDetail = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findSingleProductById(prodId, (product) => {
    // console.log(product);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/product-list",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "My Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.fetchCartProduct((cart) => {
    Product.fetchAllProducts((products) => {
      const cartProducts = [];
      for (prod of products) {
        const cartProductData = cart.products.find(
          (cartProd) => cartProd.id === prod.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: prod,
            quantity: cartProductData.quantity,
          });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const cartProdId = req.body.productId;
  Product.findSingleProductById(cartProdId, (product) => {
    Cart.addProductToCart(cartProdId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findSingleProductById(prodId, (product) => {
    Cart.deleteProductFromCart(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
