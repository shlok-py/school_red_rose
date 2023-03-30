const { PrismaClient, Prisma, photoCategory } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * get photo detail by id
 * @param {{photoId: Number}} whereKey
 * @retu detail if found
 */
async function findDetail(whereKey) {
	try {
		return prisma.tblPhoto.findUnique({
			where: whereKey,
		});
	} catch (error) {
		throw error;
	}
}

/**
 * find photos in the system
 * @param {{limit: Number, page: Number, sortBy?: String, sortType?: String}} options
 * @param {{search?:String}} filters
 */
async function findAll(options, filters) {
	try {
		const whereQuery = {
			AND: [
				filters.search && {
					OR: [{ fileNames: { contains: filters.search } }],
				},
			],
		};
		const [count, allphotos] = await prisma.$transaction([
			prisma.tblPhoto.count({
				where: whereQuery,
			}),
			prisma.tblPhoto.findMany({
				where: whereQuery,
				take: options.limit,
				skip: (options.page - 1) * options.limit,
			}),
		]);
		return {
			page: options.page,
			limit: options.limit,
			data: allphotos,
			totalData: count || 0,
			totalPages: Math.ceil(count / options.limit),
		};
	} catch (error) {
		throw error;
	}
}

/**
 * updates photo item by id
 * @param {{photoId: Number}} whereKey
 * @param {{ fileNames?: String}} photosDetails
 * @returns
 */
async function updatePhoto(whereKey, photosDetails) {
	try {
		return prisma.tblPhoto.update({
			where: { ...whereKey },
			data: { ...photosDetails },
		});
	} catch (error) {
		throw error;
	}
}

/**
 * creates  item
 * @param {[ fileNames?: String,albumId?:String]} photosDetails
 * @returns
 */
async function create(photosDetails) {
	try {
		return prisma.tblPhoto.createMany({
			data: photosDetails,
		});
	} catch (error) {
		throw error;
	}
}

/**
 * deletes user given its idc
 * @param {{id: String}} whereKey
 * @returns
 */
async function deletePhoto(whereKey) {
	try {
		return prisma.tblPhoto.delete({ where: { ...whereKey } });
	} catch (error) {
		throw error;
	}
}
module.exports = {
	findDetail,
	findAll,
	updatePhoto,
	create,
	deletePhoto,
};
