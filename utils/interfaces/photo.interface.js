const Joi = require("joi");

const photoDetailSchema = {
	params: Joi.object().keys({
		id: Joi.number().required(),
	}),
	query: {},
	body: {},
};

const photoListSchema = {
	params: {},
	query: Joi.object().keys({
		limit: Joi.number().required().min(0).required(),
		page: Joi.number().required().min(1).required(),
		search: Joi.string().optional(),
	}),
	body: {},
};

const editPhotoSchema = {
	params: Joi.object()
		.keys({
			id: Joi.number().required(),
		})
		.required(),
	query: {},
	body: Joi.object().keys({
		photoName: Joi.string().optional(),

		fileNames: Joi.string().optional(),
	}),
};

const createPhotoSchema = {
	params: {},
	query: {},
	body: Joi.object().keys({
		fileNames: Joi.string().required(),
		albumId: Joi.number().required(),
	}),
};
const photoDeleteSchema = {
	params: Joi.object().keys({
		id: Joi.number().required(),
	}),
	query: {},
	body: {},
};

module.exports = {
	createPhotoSchema,
	editPhotoSchema,
	photoListSchema,
	photoDetailSchema,
	photoDeleteSchema,
};
