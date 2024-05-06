import express from "express";
import mediaController from "../controllers/media.controller.js";

const router = express.Router({ mergeParams: true }); //? được sử dụng để cho phép router con truy cập vào các tham số từ router cha.

router.get("/search", mediaController.search);
router.get("/genres", mediaController.getGenres);
router.get("/detail/:mediaId", mediaController.getDetail);
router.get("/mediaCategory", mediaController.getList);

export default router