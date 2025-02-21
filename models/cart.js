const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProductToCart(id) {
    // Fetch the previous cart from the fileSystem
    fs.readFile(p, (err, fileContentData) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContentData);
      }
      // Analyze the cart => Find existing product
      const existingProduct = cart.products.find(
        (product) => product.id === id
      );
      // Add new product ? Increase quantity
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
      } else {
        updatedProduct = {};
      }
    });
  }
};
