const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProductToCart(id, productPrice) {
    // Fetch the previous cart from the fileSystem
    fs.readFile(p, (err, fileContentData) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContentData);
      }

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      // Add new product ? Increase quantity
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.log("error adding product to cart", err);
        } else {
          console.log("product added to cart successfully");
        }
      });
    });
  }

  static deleteProductFromCart(id, productPrice) {
    fs.readFile(p, (err, fileContentData) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContentData) };
      const product = updatedCart.products.find((product) => product.id === id);
      if (product) {
        console.log("productCart is available", product);
      } else {
        console.log("productCart is not available", product);
        return;
      }
      const productQuantity = product.quantity;
      if (productQuantity) {
        console.log("productQuantityCart is available", productQuantity);
      } else {
        console.log("productQuantityCart is not available", productQuantity);
      }

      updatedCart.products = updatedCart.products.filter(
        (product) => product.id !== id
      );

      if (updatedCart.product) {
        console.log("updatedCart.product is available", updatedCart.product);
      } else {
        console.log(
          "updatedCart.product is not available",
          updatedCart.product
        );
      }

      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQuantity;

      if (updatedCart.totalPrice) {
        console.log(
          "updatedCart.totalPrice is available",
          updatedCart.totalPrice
        );
      } else {
        console.log(
          "updatedCart.totalPrice is not available",
          updatedCart.totalPrice
        );
      }

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        if (err) {
          console.log("product is not deleted from cart", err);
        } else {
          console.log("product is deleted from cart successfully");
        }
      });
    });
  }

  static fetchCartProduct(cb) {
    fs.readFile(p, (err, fileContentData) => {
      const cart = { ...JSON.parse(fileContentData) };
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
