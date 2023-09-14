import usersModel from "../../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const generateVefifyToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      admin: user.admin,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "1d" }
  );
};

class authController {
  async login(req, res) {
    const user = await usersModel.findOne({
      email: req.body.email,
    });
    if (!user)
      return res
        .status(500)
        .json({ success: false, message: "Email not valid!" });

    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password)
      return res
        .status(500)
        .json({ success: false, message: "Password not valid!" });

    if (user && password) {
      const accessToken = generateVefifyToken(user);
      const { password, ...others } = user._doc;
      res.status(200).json({ success: true, data: others, accessToken });
    }
  }
  async register(req, res) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const data = new usersModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
    });
    await data
      .save()
      .then((user) => res.status(200).json({ success: true, data: user }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  async verifyToken(req, res) {
    jwt.verify(req.body.token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Token not valid" });
      }
      return res.status(200).json({ success: true });
    });
  }
}
export default new authController();
