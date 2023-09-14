import multer from "multer";
import crypto from "crypto";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() + crypto.randomBytes(5).toString("hex") + `.${ext}`);
  },
});

export const upload = multer({ storage: storage });
