import { ClientError, ServerError, globalError } from "#utils/error.js"
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
    },
    GET: async function(req, res){
        try{
            const {groupId} = req.params;
            if(groupId) {
                const group = await fetch(`SELECT * FROM groups WHERE group_id=$1;`, true, groupId);
                if(group) return res.status(200).json(group)
                else return res.status(200).json({message: "Group not found", code: 404})
            }
            const groups = await fetch(`SELECT * FROM groups`);
            return res.status(200).json(groups);
        }catch(error){
            return globalError(res, error);
        }
    },
    PUT: async function(req, res){
        try{
            const {group_name} = req.body;
            const {groupId} = req.params;
            if(!groupId) throw new ClientError("Group not found !", 404);
            const group = await fetch(`SELECT * FROM groups WHERE group_id=$1;`, true, groupId)
            if(!(req.user_info.user_id == group.user_id)) throw new ClientError("You have an incorrect token to update this group", 401); 
            const updateGroupRes = await fetch(`UPDATE groups SET group_name=$1 WHERE group_id=$2 RETURNING *`, true, group_name, groupId);
            if(!updateGroupRes.group_id) throw new ServerError("An error occurred while updating the group !");
            return res.status(200).json({message: "Group updated successfully", group: updateGroupRes, status: 200})
        }catch(error){
            return globalError(res, error);
        };
    },
    DELETE: async function(req, res){
        try{
            const {groupId} = req.params;
            if(!groupId) throw new ClientError("Group not found !", 404);
            const group = await fetch(`SELECT * FROM groups WHERE group_id=$1;`, true, groupId)
            if(!(req.user_info.user_id == group.user_id)) throw new ClientError("You have an incorrect token to update this group", 401); 
            const deleteGroupRes = await fetch(`DELETE from groups WHERE group_id=$1 RETURNING *`, true, groupId);
            if(!deleteGroupRes.group_id) throw new ServerError("An error occurred while updating the group !");
            return res.status(200).json({message: "Group deleted successfully", group: deleteGroupRes});
        }catch(error){
            return globalError(res, error);
        }
    }
}