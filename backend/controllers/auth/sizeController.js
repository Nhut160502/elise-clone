import { Sizes } from "../../models/sizeModel.js";

class sizeController {
  async index(req, res) {
    Sizes.find()
      .sort({ createdAt: "descending" })
      .then((sizes) => {
        res.status(200).json({ success: true, data: sizes });
      })
      .catch((err) => res.status(500).json({ success: false, err }));
  }
  async store(req, res) {
    const data = new Sizes({
      name: req.body.name,
    });
    await data
      .save()
      .then((size) => {
        res.status(200).json({
          success: true,
          message: "Stored new size successfully",
          data: size,
        });
      })
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async show(req, res) {
    Sizes.findOne({ slug: req.params.slug })
      .then((size) => res.status(200).json({ success: true, data: size }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async update(req, res) {
    Sizes.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      status: req.body.status,
    })
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Updated size successfully" })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  }
  async remove(req, res) {
    const size = await Sizes.find({
      _id: req.params.id,
      deleted: false,
    });
    if (!size.length)
      return res.status(500).json({ success: false, message: "Not found" });
    else
      Sizes.delete({ _id: req.params.id }).then(async () => {
        const sizes = await Sizes.find();
        res.status(200).json({
          success: true,
          message: "Remove size successfully",
          data: sizes,
        });
      });
  }
  async trash(req, res) {
    Sizes.findWithDeleted({ deleted: true })
      .then((sizes) => res.status(200).json({ success: true, data: sizes }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async restore(req, res) {
    const size = await Sizes.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!size.length)
      return res.status(500).json({ success: false, message: "Not Found" });
    else
      Sizes.restore({ _id: req.params.id }).then(async () => {
        const sizes = await Sizes.findWithDeleted({ deleted: true });
        res.status(200).json({
          success: true,
          message: "Restore size successfully",
          data: sizes,
        });
      });
  }

  async destroy(req, res) {
    const size = await Sizes.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!size.length)
      return res.status(500).json({ success: false, message: "Not Found" });
    else
      Sizes.findByIdAndDelete(req.params.id).then(async () => {
        const sizes = await Sizes.find();
        res.status(200).json({
          success: true,
          message: "Destroy size successfully",
          data: sizes,
        });
      });
  }
}

export default new sizeController();
