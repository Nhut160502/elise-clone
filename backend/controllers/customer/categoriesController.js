import { Categories } from "../../models/categoriesModel.js";

class categoriesController {
  async index(req, res) {
    Categories.find({ status: 1 })
      .populate("type")
      .then((categories) =>
        res.status(200).json({ success: true, data: categories })
      )
      .catch((err) => res.status(500).json(err));
  }
}

export default new categoriesController();
