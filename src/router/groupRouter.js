import { groupController } from "#controller/groupController.js";
import express from "express";
export const groupRouter = express.Router();

groupRouter.route("/").post(groupController.POST);