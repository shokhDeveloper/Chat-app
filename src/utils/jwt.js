import jwt from "jsonwebtoken";
import { serverConfiguration } from "#config";
import { ClientError } from "./error.js";
const { sign, verify } = jwt;

export const tokenConfig = {
    createToken(payload) {
        try {
            if (!payload) throw new ClientError("Payload not found", 400);
            return sign(payload, serverConfiguration.SECRET_KEY, { expiresIn: serverConfiguration.TOKEN_EXPIRES_IN });
        } catch (error) {
            console.log("Create token error:", error);
        };
    },
    verifyToken(token) {
        try {
            if (token == "null") throw new ClientError("Token is invalid!", 401);
            if (!token) throw new ClientError("Token not found!", 400);
            const parsedToken = verify(token, serverConfiguration.SECRET_KEY);
            if (!parsedToken) throw new ClientError("Token is invalid!", 401);
            return parsedToken;
        } catch (error) {
            console.log("Parsed token error:", error)
        };
    }
};