// const products = [];
const fs = require("fs");
const path = require("path");

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
  constructor(t) {
    this.title = t;
  }

  save() {
    // products.push(this);
    // const p = path.join(
    //   path.dirname(require.main.filename),
    //   "data",
    //   "products.json"
    // ); // root dir, data folder, products.json file...
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log("err01", err);
      });
    });
  }

  static fetchAllProducts(cb) {
    // return products;
    getProductsFromFile(cb);
  }
};
