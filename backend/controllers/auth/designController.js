import { Designs } from "../../models/designModel.js";

class designController {
  async index(req, res) {
    Designs.find()
      .sort({ createdAt: "descending" })
      .then((designs) => {
        res.status(200).json({ success: true, data: designs });
      })
      .catch((err) => res.status(500).json({ success: false, err }));
  }
  async store(req, res) {
    const data = new Designs({
      name: req.body.name,
    });
    await data
      .save()
      .then((design) => {
        res.status(200).json({
          success: true,
          message: "Stored new design successfully",
          data: design,
        });
      })
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async show(req, res) {
    Designs.findOne({ slug: req.params.slug })
      .then((design) => res.status(200).json({ success: true, data: design }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async update(req, res) {
    Designs.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      status: req.body.status,
    })
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Updated design successfully" })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  }
  async remove(req, res) {
    const design = await Designs.find({
      _id: req.params.id,
      deleted: false,
    });
    if (!design.length)
      return res.status(500).json({ success: false, message: "Not found" });
    else
      Designs.delete({ _id: req.params.id }).then(async () => {
        const designs = await Designs.find();
        res.status(200).json({
          success: true,
          message: "Remove design successfully",
          data: designs,
        });
      });
  }
  async trash(req, res) {
    Designs.findWithDeleted({ deleted: true })
      .then((designs) => res.status(200).json({ success: true, data: designs }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async restore(req, res) {
    const design = await Designs.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!design.length)
      return res.status(500).json({ success: false, message: "Not Found" });
    else
      Designs.restore({ _id: req.params.id }).then(async () => {
        const designs = await Designs.findWithDeleted({ deleted: true });
        res.status(200).json({
          success: true,
          message: "Restore design successfully",
          data: designs,
        });
      });
  }

  async destroy(req, res) {
    const design = await Designs.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!design.length)
      return res.status(500).json({ success: false, message: "Not Found" });
    else
      Designs.findByIdAndDelete(req.params.id).then(async () => {
        const designs = await Designs.find();
        res.status(200).json({
          success: true,
          message: "Destroy design successfully",
          data: designs,
        });
      });
  }
}

export default new designController();
