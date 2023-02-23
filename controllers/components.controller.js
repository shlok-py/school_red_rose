const componentService = require("../services/components.service");
const fileUploadService = require("../services/file.service");

/**
 * fetch list of all the components available
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchAllComponents(ctx, next) {
	try {
		const { limit, page, search } = ctx.request.query;
		const response = await componentService.findAll(
			{ limit: +limit, page: +page },
			{ ...(search && { search }) }
		);
		return (ctx.body = response);
	} catch (error) {
		throw error;
	}
}

/**
 * fetches details of a given specific component
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchComponentDetails(ctx, next) {
	try {
		const { id } = ctx.request.params;
		const response = await componentService.findDetail({ compId: +id });
		return (ctx.body = response);
	} catch (error) {
		throw error;
	}
}

/**
 * creates a new component item
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function createComponent(ctx, next) {
	try {
		console.log(ctx.request);
		const createDetails = ctx.request.body;
		const files = ctx.request.files;
		const fileNames = files.map((file) => file.filename);
		const createBody = {
			...(createDetails && createDetails),
			...(fileNames && { fileNames }),
		};
		//await componentService.create(createBody);
		return (ctx.body = "Component details created successfully");
	} catch (error) {
		throw error;
	}
}

/**
 * updates an existing component detail
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function updateComponentDetail(ctx, next) {
	try {
		const updateDetails = ctx.request.body;
		const files = ctx.request.files;
		const fileNames = files.map((file) => file.filename);
		const params = ctx.request.params;
		const { title, compCategory, fileName, details, desc, popUp } =
			updateDetails;
		const updateBody = {
			...(title && { title }),
			...(fileName && { fileNames }),
			...(details && { details }),
			...(popUp && { popUp }),
			...(desc && { desc }),
			...(compCategory && { compCategory }),
		};
		await componentService.updateComponents({ compId: +params.id }, updateBody);
		return (ctx.body = "Component  details updated successfully");
	} catch (error) {
		throw error;
	}
}
//upload file
/**
 * updates the role of the user if user id is provided
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function updateFiles(ctx, next) {
	try {
		// Save the file names in the database

		// Return a response
		const params = ctx.request.params;
		await userService.fileUploadService({ compId: params.id }, fileNames);
		return (ctx.body = "Files uploaded and saved successfully");
	} catch (error) {
		throw error;
	}
}
module.exports = {
	fetchAllComponents,
	fetchComponentDetails,
	createComponent,
	updateComponentDetail,
	updateFiles,
};
