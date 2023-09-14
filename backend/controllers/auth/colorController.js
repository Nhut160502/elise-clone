import { Colors } from "../../models/colorModel.js";

class colorController {
  async index(req, res) {
    Colors.find()
      .sort({ createdAt: "descending" })
      .then((colors) => {
        res.status(200).json({ success: true, data: colors });
      })
      .catch((err) => res.status(500).json({ success: false, err }));
  }
  async store(req, res) {
    const data = new Colors({
      name: req.body.name,
    });
    await data
      .save()
      .then((color) => {
        res.status(200).json({
          success: true,
          message: "Stored new color successfully",
          data: color,
        });
      })
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async show(req, res) {
    Colors.findOne({ slug: req.params.slug })
      .then((color) => res.status(200).json({ success: true, data: color }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async update(req, res) {
    Colors.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      status: req.body.status,
    })
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Updated color successfully" })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  }
  async remove(req, res) {
    const color = await Colors.find({
      _id: req.params.id,
      deleted: false,
    });
    if (!color.length)
      return res.status(500).json({ success: false, message: "Not found" });
    else
      Colors.delete({ _id: req.params.id }).then(async () => {
        const colors = await Colors.find();
        res.status(200).json({
          success: true,
          message: "Remove color successfully",
          data: colors,
        });
      });
  }
  async trash(req, res) {
    Colors.findWithDeleted({ deleted: true })
      .then((colors) => res.status(200).json({ success: true, data: colors }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async restore(req, res) {
    const color = await Colors.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!color.length)
      return res.status(500).json({ success: false, message: "Not Found" });
    else
      Colors.restore({ _id: req.params.id }).then(async () => {
        const colors = await Colors.findWithDeleted({ deleted: true });
        res.status(200).json({
          success: true,
          message: "Restore color successfully",
          data: colors,
        });
      });
  }

  async destroy(req, res) {
    const color = await Colors.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!color.length)
      return res.status(500).json({ success: false, message: "Not Found" });
    else
      Colors.findByIdAndDelete(req.params.id).then(async () => {
        const colors = await Colors.find();
        res.status(200).json({
          success: true,
          message: "Destroy color successfully",
          data: colors,
        });
      });
  }
}

export default new colorController();
