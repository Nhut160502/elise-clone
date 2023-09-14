import { Products } from "../../models/productModel.js";
import fs from "fs";
import "dotenv/config";
class productController {
  // [GET] /product/
  async index(req, res) {
    Products.find()
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
          product.imgUrl.forEach((img, index) => {
            product.imgUrl[
              index
            ] = `http://localhost:${process.env.PORT}/${img}`;
          });
          product.collections.imgUrl = `http://localhost:${process.env.PORT}/${product.collections.imgUrl}`;
        });
        res.status(200).json({ success: true, data: products });
      })
      .catch((err) => res.status(500).json(err));
  }

  // [POST] /product/
  async store(req, res) {
    const files = req.files;
    if (!files) {
      return res.status(500).json({
        success: false,
        message: "Please upload file",
      });
    }

    const img = [];
    files.forEach((file) => {
      img.push(file.filename);
    });

    const data = new Products({
      collections: req.body.collectionId,
      categorires: req.body.categoryId,
      name: req.body.name,
      imgUrl: img,
      designs: req.body.designId,
      colors: req.body.colorId,
      materials: req.body.materialId,
      sizes: req.body.sizeId,
      price: req.body.price,
      stock: req.body.stock,
      desc: req.body.desc,
      note: req.body.note,
    });

    await data
      .save()
      .then(async (product) => {
        return res.status(200).json({ success: true, data: product });
      })
      .catch((err) => {
        if (files) {
          files.forEach((file) => {
            var filePath = "images\\" + file.filename;
            fs.unlinkSync(filePath);
          });
        }
        res.status(500).json({ success: false, err: err });
      });
  }

  // [GET] /product/:slug
  async show(req, res) {
    Products.findOne({
      slug: req.params.slug,
    })
      .populate([
        "colors",
        "categorires",
        "collections",
        "designs",
        "sizes",
        "materials",
      ])
      .then((product) => {
        product.imgUrl.forEach((img, index) => {
          product.imgUrl[index] = `http://localhost:${process.env.PORT}/${img}`;
        });
        res.status(200).json({ success: true, data: product });
      })
      .catch((err) =>
        res.status(500).json({
          success: false,
          err,
        })
      );
  }

  // [PUT] /product/:id
  async update(req, res) {
    const files = req.files;
    const img = [];
    await Products.findById(req.params.id)
      .then((product) => {
        product.imgUrl.forEach((item) => {
          img.push(item);
        });

        if (files.length > 0) {
          files.forEach((file) => {
            img.push(file.filename);
          });
        }
      })
      .catch((err) => res.status(500).json({ success: false, err }));

    Products.findByIdAndUpdate(req.params.id, {
      collections: req.body.collectionId,
      categorires: req.body.categoryId,
      name: req.body.name,
      colors: req.body.colorId,
      designs: req.body.designId,
      materials: req.body.materialId,
      imgUrl: img,
      sizes: req.body.sizes,
      stock: req.body.stock,
      price: req.body.price,
      desc: req.body.desc,
      note: req.body.note,
      updatedAt: Date.now(),
    })
      .then(() =>
        res.status(200).json({ success: true, message: "Update successfully" })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [DELETE] /product/remove/:id
  async remove(req, res) {
    const product = await Products.findWithDeleted({
      _id: req.params.id,
      deleted: false,
    });
    if (!product.length)
      res.status(500).json({ success: false, message: "Not foud" });
    else
      Products.delete({ _id: req.params.id })
        .then(async () => {
          const data = await Products.find();
          res.status(200).json({
            success: true,
            message: "Delete successfully",
            data: data,
          });
        })
        .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [GET] /product/trash
  async trash(req, res) {
    Products.findWithDeleted({ deleted: true })
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
          product.imgUrl.forEach((img, index) => {
            product.imgUrl[
              index
            ] = `http://localhost:${process.env.PORT}/${img}`;
          });
          product.collections.imgUrl = `http://localhost:${process.env.PORT}/${product.collections.imgUrl}`;
        });
        res.status(200).json({ success: true, data: products });
      })
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [PATCH] /product/restore/:id
  async restore(req, res) {
    const product = await Products.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!product.length)
      res.status(500).json({ success: false, message: "Not foud" });
    else
      Products.restore({ _id: req.params.id })
        .then(async () => {
          const data = await Products.findWithDeleted({ deleted: true });
          res.status(200).json({
            success: true,
            message: "Restore successfully",
            data: data,
          });
        })
        .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [DELETE] /product/destroy/image
  async destroyImage(req, res) {
    Products.findById(req.params.id)
      .then(async (product) => {
        var filePath = `images/${product.imgUrl[req.body.index]}`;
        fs.unlinkSync(filePath);
        product.imgUrl.splice(req.body.index, 1);
        const data = await product.save();
        data.imgUrl.forEach((item, index) => {
          data.imgUrl[index] = `http://localhost:${process.env.PORT}/${item}`;
        });
        res.status(200).json({
          success: true,
          message: "Delete image successfully",
          data: data.imgUrl,
        });
      })
      .catch((err) => res.status(200).json(err));
  }

  // [DEKETE] /product/destroy/:id
  async destroy(req, res) {
    const product = await Products.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!product.length)
      res.status(500).json({ success: false, message: "Not foud" });
    else
      Products.findByIdAndDelete(req.params.id).then(async () => {
        const data = await Products.findWithDeleted({ deleted: true });
        res.status(200).json({
          success: true,
          message: "Destroy successfully",
          data: data,
        });
      });
  }
}
export default new productController();
