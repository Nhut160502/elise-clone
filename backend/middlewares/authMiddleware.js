import jwt from "jsonwebtoken";
import "dotenv/config";
class authMiddleware {
  verifyToken(req, res, next) {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err)
          return res
            .status(401)
            .json({ success: false, message: "Token not valid!" });
        req.user = decoded;
        return next();
      });
    } else {
      res.status(500).json({ success: false, message: "You're must login" });
    }
  }
}
export default new authMiddleware();
