import userModel from "./../models/user.model";
import jsonwebtoken from "./../models/jsonwebtoken.model";
import responseHandle from "../handlers/response.handle";

const signup = async (req, res, next) => {
  try {
    const { username, password, displayName } = req.body;

    const checkUser = await userModel.findOne({ username });
    if (checkUser) return responseHandle.badrequest(res, "user already used");

    const user = new userModel();
    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      //tạo token JWT.
      {
        data: user.id,
      },
      process.env.TOKEN_SERCET,
      {
        expiresIn: "24h",
      }
    );

    responseHandle.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandle.error(res);
  }
};

const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("username password salt id displayName"); //?  chỉ định các trường dữ liệu cụ thể muốn trả ra ở đây là các trường đó

    if (!user) return responseHandle.badrequest(res, "User not exits");
    if (!user.validPassword(password))
      return responseHandle.badrequest(res, "wrong password");

    const token = jsonwebtoken.sign(
      //tạo token JWT.
      {
        data: user.id,
      },
      process.env.TOKEN_SERCET,
      {
        expiresIn: "24h",
      }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandle.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandle.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    if (!user) return responseHandle.unauthorize(res);
    if (!user.validPassword(password))
      return responseHandle.badrequest(res, "Wrong password");

    user.setPassword(newPassword);
    await user.save();
    responseHandle.ok(res);
  } catch {
    responseHandle.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return responseHandle.notfound(res);
    responseHandle.ok(res, user);
  } catch {
    responseHandle.error(res);
  }
};

export default {
  signup,
  signin,
  updatePassword,
  getInfo,
};
