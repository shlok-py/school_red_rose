const { Faculty, UserStatus, Role } = require("@prisma/client");
const Joi = require("joi");

const userDetailSchema = {
	params: Joi.object().keys({
		id: Joi.string().required().guid(),
	}),
	query: {},
	body: {},
};

const usersListSchema = {
	params: {},
	query: Joi.object().keys({
		limit: Joi.number().required().min(0).required(),
		page: Joi.number().required().min(1).required(),
		search: Joi.string().optional(),
	}),
	body: {},
};

const editUserSchema = {
	params: Joi.object()
		.keys({
			id: Joi.string().required().guid(),
		})
		.required(),
	query: {},
	body: Joi.object().keys({
		firstName: Joi.string().optional(),
		lastName: Joi.string().optional(),
		middleName: Joi.string().optional(),
		email: Joi.string().email().optional(),
		phone: Joi.string().optional(),
		countryCode: Joi.number().optional(),

		userStatus: Joi.string()
			.valid(UserStatus.ACTIVE, UserStatus.CLOSED, UserStatus.INACTIVE)
			.optional(),
	}),
};

module.exports = {
	userDetailSchema,
	usersListSchema,
	editUserSchema,
};
