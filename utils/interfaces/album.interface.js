const { ComponentCategory } = require("@prisma/client");
const Joi = require("joi");

const albumDetailSchema = {
	params: Joi.object().keys({
		id: Joi.number().required(),
	}),
	query: {},
	body: {},
};

const albumListSchema = {
	params: {},
	query: Joi.object().keys({
		limit: Joi.number().required().min(0).required(),
		page: Joi.number().required().min(1).required(),
		search: Joi.string().optional(),
	}),
	body: {},
};

const editAlbumSchema = {
	params: Joi.object()
		.keys({
			id: Joi.number().required(),
		})
		.required(),
	query: {},
	body: Joi.object().keys({
		albumName: Joi.string().optional(),
		desc: Joi.string().optional(),
	}),
};

const createAlbumSchema = {
	params: {},
	query: {},
	body: Joi.object().keys({
		albumName: Joi.string().required(),
		desc: Joi.string().optional(),
	}),
};
const albumCategorySchema = {
	params: {},
	query: {},
	body: {},
};

module.exports = {
	createAlbumSchema,
	editAlbumSchema,
	albumListSchema,
	albumDetailSchema,
	albumCategorySchema,
};
