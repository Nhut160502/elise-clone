import "dotenv/config";
import fs from "fs";
import { Collections } from "../../models/collectionsModel.js";

class collectionsController {
  // [GET] /collection/
  async index(req, res) {
    Collections.find()
      .sort({ createdAt: "descending" })
      .then((collections) => {
        collections.map((collection) => {
          collection.imgUrl = `http://localhost:${process.env.PORT}/${collection.imgUrl}`;
        });
        return res.status(200).json({ success: true, data: collections });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  }

  // [POST] /collection/
  async store(req, res) {
    const file = req.file;
    if (!file) {
      return res.status(500).json({
        success: false,
        message: "Please upload file",
      });
    }

    console.log(file);

    const Collection = new Collections({
      name: req.body.name,
      imgUrl: req.file.filename,
    });
    await Collection.save()
      .then((collection) =>
        res.status(200).json({
          success: true,
          message: "Stored new collection successfully!",
          data: collection,
        })
      )
      .catch((err) => {
        if (file) {
          var filePath = "images\\" + req.file.filename;
          fs.unlinkSync(filePath);
        }
        res.status(500).json({ success: false, err });
      });
  }

  // [GET] /collection/:slug
  async show(req, res) {
    const collection = await Collections.findOne({
      slug: req.params.slug,
    });
    if (collection)
      return res.status(200).json({ success: false, data: collection });
    else
      res.status(500).json({
        success: false,
        message: "Not found",
      });
  }

  // [PUT] /collection/:id
  async update(req, res) {
    Collections.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      status: req.body.status,
      imgUrl: req.file?.filename,
    })
      .then(async (collection) => {
        if (req.file) {
          if (collection.imgUrl) {
            var filePath = "images\\" + collection.imgUrl;
            fs.unlinkSync(filePath);
          }
        }
        res.status(200).json({
          success: true,
          message: "Update successfully",
        });
      })
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [DELETE] /collection/:id
  async remove(req, res) {
    const collection = await Collections.find({
      _id: req.params.id,
      deleted: false,
    });

    if (!collection.length)
      return res.status(500).json({ success: false, message: "Not found" });
    else
      Collections.delete({ _id: req.params.id })
        .then(async () => {
          const collections = await Collections.find();

          collections.map((collection) => {
            collection.imgUrl = `http://localhost:${process.env.PORT}/${collection.imgUrl}`;
          });

          return res.status(200).json({
            success: true,
            message: "Delete collection successfully",
            data: collections,
          });
        })
        .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [GET] /collection/trash
  async trash(req, res) {
    Collections.findWithDeleted({ deleted: true })
      .then((collections) => {
        collections.map((collection) => {
          collection.imgUrl = `http://localhost:${process.env.PORT}/${collection.imgUrl}`;
        });
        return res.status(200).json({ success: true, data: collections });
      })
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [PATCH] /collection/restore/:id
  async restore(req, res) {
    const collection = await Collections.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });

    if (!collection.length)
      return res.status(500).json({ success: false, message: "Not foud" });
    else
      Collections.restore({ _id: req.params.id })
        .then(async () => {
          const collections = await Collections.findWithDeleted({
            deleted: true,
          });

          collections.map((collection) => {
            collection.imgUrl = `http://localhost:${process.env.PORT}/${collection.imgUrl}`;
          });

          return res.status(200).json({
            success: true,
            message: `Restore collection successfully`,
            data: collections,
          });
        })
        .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [PATCH] /collection/destroy/:id
  async destroy(req, res) {
    const collection = await Collections.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!collection.length)
      return res.status(500).json({ success: false, message: "Not found" });
    else
      Collections.findByIdAndDelete(req.params.id)
        .then(async (collection) => {
          if (collection.imgUrl) {
            var filePath = "images\\" + collection.imgUrl;
            fs.unlinkSync(filePath);
          }

          const collections = await Collections.findWithDeleted({
            deleted: true,
          });

          collections.map((collection) => {
            collection.imgUrl = `http://localhost:${process.env.PORT}/${collection.imgUrl}`;
          });

          return res.status(200).json({
            success: true,
            message: "Destroy collection successfully",
            data: collections,
          });
        })
        .catch((err) => res.status(500).json({ success: false, err }));
  }
}
export default new collectionsController();
