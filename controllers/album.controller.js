const albumService = require("../services/album.service");
const fileUploadService = require("../services/file.service");

/**
 * fetch list of all the Albums available
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchAllAlbums(ctx, next) {
	try {
		const { limit, page, search } = ctx.request.query;
		const response = await albumService.findAll(
			{ limit: +limit, page: +page },
			{ ...(search && { search }) }
		);
		return (ctx.body = response);
	} catch (error) {
		throw error;
	}
}

/**
 * fetches details of a given specific Album
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchAlbumDetails(ctx, next) {
	try {
		const { id } = ctx.request.params;
		const response = await albumService.findDetail({ albumId: +id });
		if (!response) {
			return (ctx.body = "Album Id not found ");
		}
		return (ctx.body = response);
	} catch (error) {
		throw error;
	}
}

/**
 * creates a new Album item
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function createAlbum(ctx, next) {
	try {
		//console.log(ctx.request);
		const createDetails = ctx.request.body;

		//console.log(ctx.request.body)
		//console.log(fileNames);
		const createBody = {
			...(createDetails && createDetails),
		};
		await albumService.create(createBody);
		console.log(createBody);
		return (ctx.body = "Album details created successfully");
	} catch (error) {
		throw error;
	}
}

/**
 * updates an existing Album detail
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function updateAlbumDetail(ctx, next) {
	try {
		const updateDetails = ctx.request.body;

		//console.log(ctx.request.body);

		const params = ctx.request.params;
		const { albumName, desc } = updateDetails;
		const updateBody = {
			...(albumName && { albumName }),
			...(desc && { desc }),
		};

		await albumService.updateAlbum({ albumId: +params.id }, updateBody);
		return (ctx.body = "Album  details updated successfully");
	} catch (error) {
		throw error;
	}
}
async function deleteAlbumDetails(ctx, next) {
	try {
		const { id } = ctx.request.params;
		const response = await albumService.deleteAlbum({ albumId: +id });
		return (ctx.body = "successfully deleted");
	} catch (err) {
		const text = err.message;

		ctx.status = err.statusCode || err.status || 500;
		ctx.body = {
			message: err.message,
		};
	}
}
async function findAlbumCategories(ctx, next) {
	try {
		const { id } = ctx.request.params;
		const response = await albumService.findAlbumCategories({ albumId: +id });
		if (response) {
			return (ctx.body = response);
		} else {
			return (ctx.body = "ALbum not found");
		}
	} catch (err) {
		const text = err.message;

		ctx.status = err.statusCode || err.status || 500;
		ctx.body = {
			message: err.message,
		};
	}
}
module.exports = {
	fetchAllAlbums,
	fetchAlbumDetails,
	createAlbum,
	updateAlbumDetail,
	deleteAlbumDetails,
	findAlbumCategories,
};
