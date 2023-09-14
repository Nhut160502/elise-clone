import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import slugUpdate from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema;
const designsModel = new Schema({
  name: { type: String, required: true, unique: true, lowercase: true },
  slug: { type: String, slug: "name" },
  status: { type: Boolean, default: true },
});

mongoose.plugin(slug);
mongoose.plugin(slugUpdate);
designsModel.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Designs = mongoose.model("Designs", designsModel);
