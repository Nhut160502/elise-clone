import { Products } from "../../models/productModel.js";
import "dotenv/config.js";
class productController {
  async index(req, res) {
    Products.find({ status: 1 })
      .sort({ createdAt: "descending" })
      .populate([
        "colors",
        "categorires",
        "collections",
        "designs",
        "sizes",
        "materials",
      ])
      .then((products) => {
        products.map((product) => {
          product.imgUrl.forEach((img, key) => {
            product.imgUrl[key] = `http://localhost:${process.env.PORT}/${img}`;
          });
        });
        return res.status(200).json({ success: true, data: products });
      })
      .catch((err) => res.status(500).json({ status: false, err: err }));
  }

  async show(req, res) {
    Products.findOne({ slug: req.params.slug })
      .populate([
        "colors",
        "categorires",
        "collections",
        "designs",
        "sizes",
        "materials",
      ])
      .then((product) => {
        product.imgUrl.forEach((img, key) => {
          product.imgUrl[key] = `http://localhost:${process.env.PORT}/${img}`;
        });
        res.status(200).json({ success: true, data: product });
      })
      .catch((err) => res.status(500).json({ success: false, err: err }));
  }
}

export default new productController();
