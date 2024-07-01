import express from "express";
import cors from "cors";
import { serverConfiguration } from "#config";
import {authRouter} from "#router/authRouter.js";
import { model } from "#middlewares/model.js";
import { groupRouter } from "#router/groupRouter.js";
import { checkToken } from "#middlewares/checkToken.js";
import { fetch } from "#utils/postgres.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use(model);

// Authentication
app.use("/auth", authRouter);
// Check token
app.use(checkToken)

// Get users
app.get("/users", async (req, res) => res.status(200).json(await fetch(`SELECT * FROM users;`)))

// Create group;
app.use("/channel", groupRouter);

app.listen(serverConfiguration.PORT, () => {
    console.log(`Server is running http://localhost:${serverConfiguration.PORT}`);
})