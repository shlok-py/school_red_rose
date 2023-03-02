const { ComponentCategory } = require("@prisma/client");
const Joi = require("joi");

const componentsDetailSchema = {
	params: Joi.object().keys({
		id: Joi.number().required(),
	}),
	query: {},
	body: {},
};

const componentsListSchema = {
	params: {},
	query: Joi.object().keys({
		limit: Joi.number().required().min(0).required(),
		page: Joi.number().required().min(1).required(),
		search: Joi.string().optional(),
	}),
	body: {},
};

const editComponentsSchema = {
	params: Joi.object()
		.keys({
			id: Joi.number().required(),
		})
		.required(),
	query: {},
	body: Joi.object().keys({
		title: Joi.string().optional(),
		desc: Joi.string().optional(),
		image_name: Joi.string().optional(),
		pop_up: Joi.boolean().optional(),
		details: Joi.string().optional(),
		compCategory: Joi.string()
			.valid(
				ComponentCategory.NEWS,
				ComponentCategory.NOTICE,
				ComponentCategory.DOWNLOAD,
				ComponentCategory.EVENT,
				ComponentCategory.GALLERY
			)
			.optional(),
	}),
};

const createComponentsSchema = {
	params: {},
	query: {},
	body: Joi.object().keys({
		title: Joi.string().optional(),
		desc: Joi.string().optional(),
		image_name: Joi.string().optional(),
		details: Joi.string().optional(),
		pop_up: Joi.boolean().optional(),
		compCategory: Joi.string()
			.valid(
				ComponentCategory.NEWS,
				ComponentCategory.NOTICE,
				ComponentCategory.DOWNLOAD,
				ComponentCategory.EVENT,
				ComponentCategory.GALLERY
			)
			.required(),
	}),
};

module.exports = {
	createComponentsSchema,
	editComponentsSchema,
	componentsListSchema,
	componentsDetailSchema,
};
