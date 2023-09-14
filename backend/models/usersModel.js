import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema;

const usersModel = new Schema(
  {
    firstName: { type: String, required: true, lowercase: true },
    lastName: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phoneNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Number, default: 1 },
  },
  { timestamps: true }
);

usersModel.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

export default mongoose.model("users", usersModel);
