import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import slugUpdate from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema;
const collectionsModel = new Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    slug: { type: String, slug: "name" },
    imgUrl: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

mongoose.plugin(slug);
mongoose.plugin(slugUpdate);
collectionsModel.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Collections = mongoose.model("Collections", collectionsModel);
