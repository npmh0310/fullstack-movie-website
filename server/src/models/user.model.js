import mongoose from "mongoose";
import modelOptions from "./model.options";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // giá trị duy nhất
    },
    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      // mã hóa
      type: String,
      required: true,
      select: false, // select: false cho trường đó. Khi đó, khi bạn truy vấn thông tin người dùng, mật khẩu không được trả về mặc định, giúp tăng cường bảo mật.
    },
  },
  modelOptions
);

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex"); // hàm randomBytes(16) tạo ra một chuỗi ngẫu nhiên 16 byte (hoặc 32 ký tự hex).

  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validPassword = function (password) {
  //? nhận mật khẩu người dùng rồi mã hóa. Sau đó so sánh mật khẩu đã mã hóa
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.password === hash;
};

//? nó sẽ tạo một salt mới, kết hợp với mật khẩu và băm mật khẩu đó, sau đó lưu kết quả vào trường password của đối tượng người dùng

const userModel = mongoose.model("User", userSchema); //? tham số thứ 2 "user" tự động tạo ra 1 collection nếu không có. Còn nếu có nó sẽ tự map vào

export default userModel;
