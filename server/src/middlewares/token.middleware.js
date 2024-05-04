import jsonwebtoken from "jsonwebtoken";
import responseHandle from "../handlers/response.handle";
import userModel from "../models/user.model";
//?  để giải mã và kiểm tra tính hợp lệ của token được gửi trong tiêu đề "Authorization" của request HTTP
const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["Authorization"];
    if (bearerHeader) {
      const token = bearerHeader.split("")[1];
      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }
    return false;
  } catch {
    return false;
  }
};

//? Hàm này là một middleware có thể sử dụng để xác thực người dùng trước khi cho phép họ truy cập vào một route cụ thể.
const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (!tokenDecoded) return responseHandle.unauthorize(res);
  const user = await userModel.findById(tokenDecoded.data);
  if (!user) return responseHandle.unauthorized(res);
  req.user = user;
  next();
};

export default { auth, tokenDecode };
