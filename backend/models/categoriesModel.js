import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import slugUpdate from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema;
const categoriesModel = new Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    slug: { type: String, slug: "name" },
    status: { type: Boolean, default: true },
    type: { type: Schema.Types.ObjectId, ref: "Types", required: true },
  },
  { timestamps: true }
);

mongoose.plugin(slug);
mongoose.plugin(slugUpdate);
categoriesModel.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Categories = mongoose.model("Categories", categoriesModel);
