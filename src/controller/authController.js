import { ClientError, globalError } from "#utils/error.js";
import { tokenConfig } from "#utils/jwt.js";
import { fetch, insertUser } from "#utils/postgres.js";
import { userLoginValidator, userValidator } from "#utils/validator.js";

export const authController = {
    REGISTER: async function(req, res){
        try{
            const user = req.body;
            if(userValidator.validate(user).error instanceof Error) throw new ClientError(userValidator.validate(user).error.message, 400);
            const {result} = await req.check(user.email, "register");
            if(result) throw new ClientError("User already exists in the program", 400);
            const insertUserRes = await insertUser(user.username, user.email, user.password, user.confirmPassword);   
            if(insertUserRes.user_id) return res.status(201).json({message: "User registered successfully", data: insertUserRes, status: 201, accessToken: tokenConfig.createToken({user_id: insertUserRes.user_id, userAgent: req.headers["user-agent"]})});         
        }catch(error){
            return globalError(res, error);
        }
    },
    LOGIN: async function(req, res){
        try{
            const user = req.body;
            if(userLoginValidator.validate(user).error instanceof Error) throw new ClientError(userLoginValidator.validate(user).error.message, 400);
            const {result} = await req.check(user.email, "login");
            if(!result) throw new ClientError("User not found", 404);
            const getUser = await fetch(`SELECT * FROM users WHERE email=$1`, true, user.email);
            return res.status(200).json({message: "User logined successfully", user: getUser, accessToken: tokenConfig.createToken({user_id: getUser.user_id, userAgent: req.headers["user-agent"]})});
        }catch(error){
            return globalError(res, error);
        }
    }
}