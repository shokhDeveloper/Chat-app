import Joi from "joi";

export const userValidator = Joi.object({
    username: Joi.string().required().error(() => new Error("Username is required !")),
    email: Joi.string().regex(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).error(() => new Error("Email is required !")),
    password: Joi.string().max(16).min(3).error(() => new Error("Password is required !")),
    confirmPassword: Joi.string().max(16).min(3).error(() => new Error("Confirm password is required !"))   
});
export const userLoginValidator = Joi.object({
    email: Joi.string().regex(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).error(() => new Error("Email is required !")),
    password: Joi.string().max(16).min(3).error(() => new Error("Password is required !"))
})
export const groupValidator = Joi.object({
    group_name: Joi.string().max(100).required().error(() => new Error("Group name is required !")),
    user_id: Joi.number().required().error(() => new Error("Group avtor id is required !"))   
})