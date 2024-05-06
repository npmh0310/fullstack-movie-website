import express from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

//* SIGN UP
router.post(
  "/signup",
  body("username") //? Tương ứng với name="username" ở thẻ input
    .exists() //? bắt lỗi nếu như không nhập gì vào trường đó (vì nếu không có function này thì vẫn có thể pass được nếu input rỗng)
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("username minium 8 characters")
    .custom(async (value) => {
      //? kiểm tra xem giá trị của trường username đã được sử dụng trước đó hay chưa
      const user = await userModel.find({ username: value }); //? value là giá trị của trường input (username) nhập vào
      if (user) return Promise.reject("username already used");
    }),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minium 8 characters"),
  body("confirmPassword")
    .exists()
    .withMessage("confirmpassword is required")
    .isLength({ min: 8 })
    .withMessage("confirmPassword minium 8 characters")
    .custom((value, { req }) => {
      //? hàm có sẵn của express validation dùng để kiểm tra (ở đây kiểm tra giá trị confirmpassword nhập vào với giá trị password ở trên (cũng nhập vào))
      if (value !== req.body.password)
        throw new Error("confirmpassword not match");
      return true;
    }),
  body("displayName")
    .exists()
    .withMessage("displayname is required")
    .isLength({ min: 8 })
    .withMessage("displayName minium 8 characters"),
  requestHandler.validate,
  userController.signup
);
//* SIGN IN
router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("username minium 8 characters"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minium 8 characters"),
  requestHandler.validate,
  userController.signin
);
//* CHANGE PASSWORD
router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minium 8 characters"),
  body("newPassword")
    .exists()
    .withMessage("newPassword is required")
    .isLength({ min: 8 })
    .withMessage("newPassword minium 8 characters"),
  body("password")
    .exists()
    .withMessage("confirmNewPassword is required")
    .isLength({ min: 8 })
    .withMessage("confirmNewPassword minium 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error("confirmNewPassword not match");
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);
//* GET INFO
router.get("/info", tokenMiddleware.auth, userController.getInfo);
//*GET FAVORITE
router.get(
  "/favorites",
  tokenMiddleware.auth,
  favoriteController.getFavoriteOfUser
);
//* ADD FAVORITE (example: 'POST /favorites?mediaType=movie&mediaId=12345')
router.post(
  "/favorites",
  tokenMiddleware.auth,
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie, tv"].includes(type)) //? kiểm tra mediatype thuộc các thành phần trong mảng k
    .withMessage("mediaType is invalid"),
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId cannot be empty"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  body("mediaRate").exists().withMessage("mediaRate is required"),
  favoriteController.addFavorite
);

//* DELETE FAVORITE
router.delete(
  "/favorite/:favoriteId",
  tokenMiddleware.auth,
  favoriteController.removeFavorite
);

export default router;
