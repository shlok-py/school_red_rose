const photoService = require("../services/photo.service");
const fileUploadService = require("../services/file.service");

/**
 * fetch list of all the photos available
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchAllPhotos(ctx, next) {
	try {
		const { limit, page, search } = ctx.request.query;
		const response = await photoService.findAll(
			{ limit: +limit, page: +page },
			{ ...(search && { search }) }
		);
		return (ctx.body = response);
	} catch (error) {
		throw error;
	}
}

/**
 * fetches fileName of a given specific Photo
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchPhoto(ctx, next) {
	try {
		const { id } = ctx.request.params;
		const response = await photoService.findDetail({ photoId: +id });
		return (ctx.body = response);
	} catch (error) {
		throw error;
	}
}

/**
 * creates a new Photo item
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function createPhoto(ctx, next) {
	try {
		//console.log(ctx.request);
		const { albumId } = ctx.request.body;
		const fileNames = ctx.request.files;

		const fileN = fileNames.map((eachFile) => {
			return { albumId: +albumId, fileNames: eachFile.filename };
		});
		// console.log(fileNames);

		await photoService.create(fileN);
		// console.log(createBody);
		return (ctx.body = "Photo  created successfully");
	} catch (error) {
		throw error;
	}
}

/**
 * updates an existing Photo detail
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function updatePhotoDetail(ctx, next) {
	try {
		const updatefileName = ctx.request.body;
		const files = ctx.request.files;
		const text = files.map((file) => file.filename);

		//console.log(ctx.request.body);
		let fileName = text.toString();
		const params = ctx.request.params;
		const { photoName, desc, fileNames } = updatefileName;
		const updateBody = {
			...(photoName && { photoName }),
			...(fileNames && { fileName }),
			...(desc && { desc }),
		};

		await photoService.updatePhoto({ photoId: +params.id }, updateBody);
		return (ctx.body = "Photo  fileName updated successfully");
	} catch (error) {
		throw error;
	}
}
async function deletePhoto(ctx, next) {
	try {
		const { id } = ctx.request.params;
		const response = await photoService.deletePhoto({ photoId: +id });
		return (ctx.body = "successfully deleted");
	} catch (error) {
		const text = err.message;

		ctx.status = err.statusCode || err.status || 500;
		ctx.body = {
			message: err.message,
		};
	}
}
module.exports = {
	fetchAllPhotos,
	fetchPhoto,
	createPhoto,
	updatePhotoDetail,
	deletePhoto,
};
