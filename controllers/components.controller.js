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
		//console.log(ctx.request);
		const createDetails = ctx.request.body;

		const createBody = {
			...(createDetails && createDetails),
		};
		await componentService.create(createBody);
		console.log(createBody);
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
		const text = files.map((file) => file.filename);

		//console.log(ctx.request.body);
		let fileNames = text.toString();
		const params = ctx.request.params;
		const { title, compCategory, details, desc, popUp } = updateDetails;
		const updateBody = {
			...(title && { title }),
			...(fileNames && { fileNames }),
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
async function deleteComponentDetails(ctx, next) {
	try {
		const { id } = ctx.request.params;
		const response = await componentService.deleteComponent({ compId: +id });
		return (ctx.body = "successfully deleted");
	} catch (error) {
		throw error;
	}
}
module.exports = {
	fetchAllComponents,
	fetchComponentDetails,
	createComponent,
	updateComponentDetail,
	deleteComponentDetails,
};
