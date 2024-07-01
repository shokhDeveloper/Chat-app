import { groupController } from "#controller/groupController.js";
import express from "express";
export const groupRouter = express.Router();

groupRouter.route("/").post(groupController.POST);
groupRouter.route("/all").get(groupController.GET);
groupRouter.route("/:groupId").get(groupController.GET).put(groupController.PUT).delete(groupController.DELETE);