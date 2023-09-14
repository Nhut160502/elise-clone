import { Types } from "../../models/typeProductModel.js";

class typesController {
  async index(req, res) {
    Types.find({ status: 1 })
      .then((types) => res.status(200).json({ success: true, data: types }))
      .catch((err) => res.status(500).json(err));
  }
}

export default new typesController();
