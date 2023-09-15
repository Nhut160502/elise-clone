import { Collections } from "../../models/collectionsModel.js";
import "dotenv/config.js";

class collectionsController {
  async index(req, res) {
    Collections.find().then((collections) => {
      collections.map((collection) => {
        collection.imgUrl = `http://localhost:${process.env.PORT}/${collection.imgUrl}`;
      });
      res.status(200).json({ success: true, data: collections });
    });
  }
}

export default new collectionsController();
