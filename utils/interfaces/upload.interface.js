const Joi = require("joi");

const uploadSchema = Joi.object({
	category: Joi.string()
		.valid("news", "gallery", "activities", "event", "download")
		.required(),
});

module.exports = {
	uploadSchema,
};
