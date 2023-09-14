import { Materials } from "../../models/materialModel.js";

class materialController {
  async index(req, res) {
    Materials.find()
      .sort({ createdAt: "descending" })
      .then((materials) => {
        res.status(200).json({ success: true, data: materials });
      })
      .catch((err) => res.status(500).json({ success: false, err }));
  }
  async store(req, res) {
    const data = new Materials({
      name: req.body.name,
    });
    await data
      .save()
      .then((material) => {
        res.status(200).json({
          success: true,
          message: "Stored new material successfully",
          data: material,
        });
      })
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async show(req, res) {
    Materials.findOne({ slug: req.params.slug })
      .then((material) =>
        res.status(200).json({ success: true, data: material })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async update(req, res) {
    Materials.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      status: req.body.status,
    })
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Updated material successfully" })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  }
  async remove(req, res) {
    const material = await Materials.find({
      _id: req.params.id,
      deleted: false,
    });
    if (!material.length)
      return res.status(500).json({ success: false, message: "Not found" });
    else
      Materials.delete({ _id: req.params.id }).then(async () => {
        const materials = await Materials.find();
        res.status(200).json({
          success: true,
          message: "Remove material successfully",
          data: materials,
        });
      });
  }
  async trash(req, res) {
    Materials.findWithDeleted({ deleted: true })
      .then((materials) =>
        res.status(200).json({ success: true, data: materials })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async restore(req, res) {
    const material = await Materials.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!material.length)
      return res.status(500).json({ success: false, message: "Not Found" });
    else
      Materials.restore({ _id: req.params.id }).then(async () => {
        const materials = await Materials.findWithDeleted({ deleted: true });
        res.status(200).json({
          success: true,
          message: "Restore material successfully",
          data: materials,
        });
      });
  }

  async destroy(req, res) {
    const material = await Materials.findWithDeleted({
      _id: req.params.id,
      deleted: true,
    });
    if (!material.length)
      return res.status(500).json({ success: false, message: "Not Found" });
    else
      Materials.findByIdAndDelete(req.params.id).then(async () => {
        const materials = await Materials.find();
        res.status(200).json({
          success: true,
          message: "Destroy material successfully",
          data: materials,
        });
      });
  }
}

export default new materialController();
