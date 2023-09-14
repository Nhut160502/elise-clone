import mongoose from "mongoose";
import "dotenv/config";
const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connect Database Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDatabase;
