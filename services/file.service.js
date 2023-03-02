const multer = require("koa-multer");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const prisma = new PrismaClient();

/**
 * upload and updates file name of the image
 * @param {{compId: Number}} whereKey
 * @param {{imageName?: String}} fileName
 * @returns
 */
async function uploadFile(whereKey, fileName) {
	try {
		return prisma.tblComp.update({
			where: { ...whereKey },
			data: { ...fileName },
		});
	} catch (error) {
		throw error;
	}
	// Set up Multer storage and file filters
}

function downloadFile(...path) {}

module.exports = { uploadFile, downloadFile };
