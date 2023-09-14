import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import slugUpdate from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";
import uniqueValidator from "mongoose-unique-validator";
const Schema = mongoose.Schema;
const productModel = new Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng thêm tên cho sản phẩm!"],
      unique: [true, "Tên sản phẩm đã được sử dụng!"],
      lowercase: true,
    },
    slug: { type: String, slug: "name" },
    status: { type: Boolean, default: true },
    categorires: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: [true, "Vui lòng thêm danh mục cho sản phẩm!"],
    },
    collections: {
      type: Schema.Types.ObjectId,
      required: [true, "rei"],
      ref: "Collections",
    },
    colors: {
      type: Schema.Types.ObjectId,
      ref: "Colors",
      required: [true, "Vui lòng thêm màu sắc cho sản phẩm!"],
    },
    sizes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Sizes",
        required: [true, "Vui lòng thêm kích thước cho sản phẩm!"],
      },
    ],
    designs: {
      type: Schema.Types.ObjectId,
      ref: "Designs",
      required: [true, "Vui lòng thêm thiết kế cho sản phẩm!"],
    },
    materials: {
      type: Schema.Types.ObjectId,
      ref: "Materials",
      required: [true, "Vui lòng thêm chất liệu cho sản phẩm!"],
    },
    price: {
      type: Number,
      required: [true, "Vui lòng thêm giá cho sản phẩm!"],
    },
    discount: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    stock: [{ type: Number }],
    imgUrl: [{ type: String }],
    desc: { type: String },
    note: { type: String },
  },
  { timestamps: true }
);

mongoose.plugin(slug);
mongoose.plugin(slugUpdate);
productModel.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
productModel.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

export const Products = mongoose.model("Products", productModel);
