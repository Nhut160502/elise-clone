import { Types } from "../../models/typeProductModel.js";

class typeProductController {
  // [GET] /type/
  async index(req, res) {
    Types.find()
      .sort({ createdAt: "asc" })
      .then((types) => res.status(200).json({ success: true, data: types }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [POST] /type/
  async store(req, res) {
    const data = new Types({
      name: req.body.name,
    });
    await data
      .save()
      .then((type) =>
        res.status(200).json({
          success: true,
          data: type,
          message: "Stored new type product successflly",
        })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [GET] /type/:slug
  async show(req, res) {
    const type = await Types.findOne({ slug: req.params.slug });
    if (type) res.status(200).json({ success: true, data: type });
    else
      res.status(500).json({
        success: false,
        message: "Not found",
      });
  }

  // [PUT] /type/:id
  async update(req, res) {
    const data = formatDate();
    Types.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      status: req.body.status,
      updatedAt: data,
    })
      .then(() =>
        res.status(200).json({
          success: true,
          message: "Update successfully",
        })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [DELETE] /type/:id
  async remove(req, res) {
    const type = await Types.find({
      _id: req.params.id,
      deleted: false,
    });
    if (!type.length)
      res.status(500).json({ success: false, message: "Not found" });
    else
      Types.delete({ _id: req.params.id })
        .then(async () => {
          const data = await Types.find();
          res.status(200).json({
            success: true,
            message: "Remove successfully",
            data: data,
          });
        })
        .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [GET] /type/trash
  async trash(req, res) {
    Types.findWithDeleted({ deleted: true })
      .then((types) => res.status(200).json({ success: true, data: types }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [PATCH] /type/restore/:id
  async restore(req, res) {
    const type = await Types.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!type.length)
      res.status(500).json({ success: false, message: "Not found" });
    else
      Types.restore({ _id: req.params.id })
        .then(async () => {
          const data = await Types.findWithDeleted({
            deleted: true,
          });
          res.status(200).json({
            success: true,
            message: "Restore successfully",
            data: data,
          });
        })
        .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [DELETE] /type/destroy/:id
  async destroy(req, res) {
    const type = await Types.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!type.length)
      res.status(500).json({ success: false, message: "Not found" });
    else
      Types.findByIdAndDelete(req.params.id)
        .then(async () => {
          const data = await Types.findWithDeleted({
            deleted: true,
          });
          res.status(200).json({
            success: true,
            message: "Destroy successfully",
            data: data,
          });
        })
        .catch((err) => res.status(500).json({ success: false, err }));
  }
}

export default new typeProductController();
