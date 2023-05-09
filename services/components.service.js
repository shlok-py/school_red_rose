const { PrismaClient, Prisma, ComponentCategory } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * get component detail by id
 * @param {{compId: Number}} whereKey
 * @retu detail if found
 */
async function findDetail(whereKey) {
	try {
		return prisma.tblComp.findUnique({
			where: whereKey,
		});
	} catch (error) {
		throw error;
	}
}

/**
 * find components in the system
 * @param {{limit: Number, page: Number, sortBy?: String, sortType?: String}} options
 * @param {{search?:String}} filters
 */
async function findAll(options, filters) {
	try {
		const whereQuery = {
			AND: [
				filters.search && {
					OR: [
						{ title: { contains: filters.search } },
						{ desc: { contains: filters.search } },
						//{ pop_up: { contains: filters.search } },
						//can add pop_up to search
					],
				},
			],
		};
		const [count, allComponents] = await prisma.$transaction([
			prisma.tblComp.count({
				where: whereQuery,
			}),
			prisma.tblComp.findMany({
				where: whereQuery,
				take: options.limit,
				skip: (options.page - 1) * options.limit,
			}),
		]);
		return {
			page: options.page,
			limit: options.limit,
			data: allComponents,
			totalData: count || 0,
			totalPages: Math.ceil(count / options.limit),
		};
	} catch (error) {
		throw error;
	}
}

/**
 * updates Component item by id
 * @param {{compId: Number}} whereKey
 * @param {{title?: String, imageName?: String,imageName?: String,details?:String, popUp?: Boolean, desc?: String, compCategory?: ComponentCategory}} componentsDetails
 * @returns
 */
async function updateComponents(whereKey, componentsDetails) {
	try {
		return prisma.tblComp.update({
			where: { ...whereKey },
			data: { ...componentsDetails },
		});
	} catch (error) {
		throw error;
	}
}

/**
 * creates  item
 * @param {{title?: String,  popUp?: Boolean,desc?: String,compCategory?: ComponentCategory}} componentsDetails
 * @returns
 */
async function create(componentsDetails) {
	try {
		return prisma.tblComp.create({
			data: { ...componentsDetails },
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
async function deleteComponent(whereKey) {
	try {
		return prisma.tblComp.delete({ where: { ...whereKey } });
	} catch (error) {
		throw error;
	}
}
module.exports = {
	findDetail,
	findAll,
	updateComponents,
	create,
	deleteComponent,
};
