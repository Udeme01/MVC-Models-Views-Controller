const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContentData) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContentData));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log("err01", err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log("err01", err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      if (product) {
        console.log("productJSON is available", product);
      } else {
        console.log("productJSON is not available", product);
      }
      const updatedProducts = products.filter((prod) => prod.id !== id);
      if (updatedProducts) {
        console.log("updatedProductsJSON is available", updatedProducts);
      } else {
        console.log("updatedProductsJSON is not available", updatedProducts);
      }
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProductFromCart(id, product.price);
        }
      });
    });
  }

  static fetchAllProducts(cb) {
    getProductsFromFile(cb);
  }

  static findSingleProductById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
