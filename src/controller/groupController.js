import { ClientError, globalError } from "#utils/error.js"
import { fetch } from "#utils/postgres.js";
import { groupValidator } from "#utils/validator.js";

export const groupController = {
    POST: async function(req, res){
        try{
            const new_group = req.body;
            if(groupValidator.validate(new_group).error instanceof Error) throw new ClientError(groupValidator.validate(new_group).error.message, 401);
            const check = await req.check_group(new_group.group_name);
            if(check) throw new ClientError("This is group already exists !", 400);
            console.log(new_group)
            const insertGroup = await fetch(`INSERT INTO groups (group_name, user_id) VALUES($1, $2) RETURNING *;`, true, new_group.group_name, new_group.user_id);
            if(!(insertGroup.group_id)) return res.status(400).json({message: "There was a problem creating the group !", statusCode: 400})
            return res.status(201).json({message: "Group created successfully", group: insertGroup, statusCode: 201});
        }catch(error){
            return globalError(res, error)
        }
    }
}