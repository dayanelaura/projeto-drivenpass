import joi from "joi";

export const credentialSchema = joi.object({
    user: joi.number().required(),
    title: joi.string().required(),
    url: joi.string().uri().required(),
	username: joi.string().required(),
	password: joi.string().min(10).required()
});
