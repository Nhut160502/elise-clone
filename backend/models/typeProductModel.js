import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import slugUpdate from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema;
const typeProductModel = new Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    slug: { type: String, slug: "name" },
    status: { type: Boolean, default: true },
    categorires: { type: Schema.Types.ObjectId, ref: "Categories" },
  },
  { timestamps: true }
);

mongoose.plugin(slug);
mongoose.plugin(slugUpdate);
typeProductModel.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});
export const Types = mongoose.model("Types", typeProductModel);
