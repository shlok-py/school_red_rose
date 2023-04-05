const { PrismaClient, Prisma, AlbumCategory } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * get Album detail by id
 * @param {{albumId: Number}} whereKey
 * @retu detail if found
 */
async function findDetail(whereKey) {
	try {
		return prisma.tblAlbum.findUnique({
			where: whereKey,
		});
	} catch (error) {
		throw error;
	}
}

/**
 * find Albums in the system
 * @param {{limit: Number, page: Number, sortBy?: String, sortType?: String}} options
 * @param {{search?:String}} filters
 */
async function findAll(options, filters) {
	try {
		const whereQuery = {
			AND: [
				filters.search && {
					OR: [
						{ albumName: { contains: filters.search } },
						{ desc: { contains: filters.search } },
						//{ pop_up: { contains: filters.search } },
						//can add pop_up to search
					],
				},
			],
		};
		const [count, allAlbum] = await prisma.$transaction([
			prisma.tblAlbum.count({
				where: whereQuery,
			}),
			prisma.tblAlbum.findMany({
				where: whereQuery,
				include: {
					tblPhoto: {
						select: {
							photoId: true,

							fileNames: true,
							createdAt: true,
						},
					},
				},
				take: options.limit,
				skip: (options.page - 1) * options.limit,
			}),
		]);
		return {
			page: options.page,
			limit: options.limit,
			data: allAlbum,
			totalData: count || 0,
			totalPages: Math.ceil(count / options.limit),
		};
	} catch (error) {
		throw error;
	}
}

/**
 * updates Album item by id
 * @param {{albumId: Number}} whereKey
 * @param {{albumName?: String,desc?:String, }} albumDetails
 * @returns
 */
async function updateAlbum(whereKey, albumDetails) {
	try {
		return prisma.tblAlbum.update({
			where: { ...whereKey },
			data: { ...albumDetails },
		});
	} catch (error) {
		throw error;
	}
}

/**
 * creates  item
 * @param {{albumName?: String,desc?: String,}} albumDetails
 * @returns
 */
async function create(albumDetails) {
	try {
		return prisma.tblAlbum.create({
			data: { ...albumDetails },
		});
	} catch (error) {
		throw error;
	}
}

/**
 * deletes user given its id
 * @param {{id: String}} whereKey
 * @returns
 */
async function deleteAlbum(whereKey) {
	try {
		return prisma.tblAlbum.delete({ where: { ...whereKey } });
		return prisma.$transaction([
			prisma.tblPhoto.delete({
				where: whereKey,
			}),
			prisma.tblAlbum.delete({
				where: { ...whereKey },
			}),
		]);
	} catch (error) {
		throw error;
	}
}
async function findAlbumCategories(whereKey) {
	try {
		const whereQuery = {};
		const allAlbum = prisma.tblAlbum.findMany({
			where: whereQuery,
			select: { albumId: true, albumName: true },
		});
		return allAlbum;
	} catch (error) {
		throw error;
	}
}
module.exports = {
	findDetail,
	findAll,
	updateAlbum,
	create,
	deleteAlbum,
	findAlbumCategories,
};
