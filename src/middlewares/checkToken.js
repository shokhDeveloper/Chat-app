import { ClientError, globalError } from "#utils/error.js"
import { tokenConfig } from "#utils/jwt.js";
import { fetch } from "#utils/postgres.js";

export const checkToken = async (req, res, next) => {
    try{
        const token = req.headers["authorization"];
        if(!token) throw new ClientError("Token does not exist or you are not registered !", 401);
        const verifyToken = tokenConfig.verifyToken(token);
        const check = await fetch(`SELECT * FROM users WHERE user_id=$1`, true, verifyToken.user_id);
        if(!check) throw new ClientError("Token is invalid !", 401);
        if(req.headers["user-agent"] !== verifyToken["userAgent"]) throw new ClientError("Token is invalid !", 401);
        else{
            req.user_info = verifyToken;
            return next()
        };
    }catch(error){
        return globalError(res, error);
    };
}