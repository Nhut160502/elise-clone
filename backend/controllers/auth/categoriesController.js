import { Categories } from "../../models/categoriesModel.js";
class categoriesController {
  // [GET] /category/
  async index(req, res) {
    Categories.find()
      .sort({ createdAt: "descending" })
      .populate("type")
      .then((categories) => {
        return res.status(200).json({ success: true, data: categories });
      });
  }

  // [POST] /category/
  async store(req, res) {
    const data = new Categories({
      name: req.body.name,
      type: req.body.typeId,
    });
    await data
      .save()
      .then((category) =>
        res.status(200).json({
          success: true,
          data: category,
          message: "Stored new category successfully",
        })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [GET] /category/:slug
  async show(req, res) {
    const category = await Categories.findOne({
      slug: req.params.slug,
    });
    if (category) res.status(200).json({ success: true, data: category });
    else
      res.status(500).json({
        success: false,
        message: "Not found",
      });
  }

  // [PUT] /category/:id
  async update(req, res) {
    const date = formatDate();
    Categories.findByIdAndUpdate(req.params.id, {
      typeId: req.body.typeId,
      name: req.body.name,
      status: req.body.status,
      updatedAt: date,
    })
      .then(() =>
        res.status(200).json({
          success: true,
          message: "Update successfully",
        })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [DELETE] /category/:id
  async remove(req, res) {
    const category = await Categories.find({
      _id: req.params.id,
      deleted: false,
    });

    if (!category.length)
      return res.status(500).json({ success: false, message: "Not foud" });
    else
      Categories.delete({ _id: req.params.id })
        .then(async () => {
          const data = await Categories.find();
          return res.status(200).json({
            success: true,
            message: "Remove successfully",
            data: data,
          });
        })
        .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [GET] /category/trash
  async trash(req, res) {
    Categories.findWithDeleted({ deleted: true })
      .then((categories) =>
        res.status(200).json({ success: true, data: categories })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [PATCH] /category/restore/:id
  async restore(req, res) {
    const category = await Categories.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!category.length)
      return res.status(401).json({ success: false, message: "Not found" });
    else
      Categories.restore({ _id: req.params.id })
        .then(async () => {
          const data = await Categories.findWithDeleted({ deleted: true });
          res.status(200).json({
            success: true,
            message: "Restore successfully",
            data: data,
          });
        })
        .catch((err) => res.status(500).json({ success: false, err }));
  }

  // [DELETE] /category/destroy/:id
  async destroy(req, res) {
    const category = await Categories.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!category.length)
      return res.status(500).json({ success: false, message: "Not found" });
    else
      Categories.findByIdAndDelete(req.params.id)
        .then(async () => {
          const data = await Categories.findWithDeleted({ deleted: true });
          res.status(200).json({
            success: true,
            message: "Destroy success fully",
            data: data,
          });
        })
        .catch((err) => res.status(500).json({ success: false, err }));
  }
}
export default new categoriesController();
