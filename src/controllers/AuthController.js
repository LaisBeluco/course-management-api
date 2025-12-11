import {generateToken} from "../config/auth.js";
import User from "../models/User.js";

class AuthController {
  async login(req, res) {
    const [, hash] = req.headers.authorization?.split(" ") || [" ", " "];
    const [email, password] = Buffer.from(hash, "base64")
      .toString()
      .split(":");

    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ user });

    return res.status(200).json({ user, token });
  }
}

export default new AuthController();