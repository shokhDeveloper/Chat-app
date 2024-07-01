import { globalError } from "#utils/error.js"
import { fetch } from "#utils/postgres.js"

export const model = (req, res, next) => {
    req.check = async function(email, type){
        const user = await fetch(`SELECT * FROM users WHERE email=$1`,true, email);
        // Check register
        if(user && type == "register") return {result: true, user_id: user.user_id }
        if(!user && type == "register") return {result: false, user_id: null };

        if(user && type == "login") return {result: true, user_id: user.user_id };
        if(!user && type == "login") return {result: false, user_id: null };
    };
    req.check_group = async function(){
        const group = await fetch(`SELECT * from groups WHERE group_name=$1`, true, )
        return !!group
    };
    return next()
}