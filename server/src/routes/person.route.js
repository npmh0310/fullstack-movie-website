import express from "express";
import personController from "../controllers/person.controller.js";

const router = express.Router({ mergeParams: true }); //? được sử dụng để cho phép router con truy cập vào các tham số từ router cha.

router.get('/:personId/medias', personController.personMedias)
router.get('/:personId', personController.personDetail)

export default router