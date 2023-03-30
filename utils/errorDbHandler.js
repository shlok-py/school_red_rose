const { Prisma } = require("@prisma/client");
const { CONFLICT, NOT_FOUND, NO_CONTENT } = require("http-status");
const ApiError = require("./errorHandler");

function handleDbError(error) {
	message = error.meta.cause;
	if (error.code === "P2002") {
		return {
			message: "Field " + "should be unique",
			statusCode: CONFLICT,
		};
	}

	if (error.code === "P2025") {
		return {
			message: message,
			statusCode: NOT_FOUND,
		};
	}
}

function checkIfDbError(e) {
	return e instanceof Prisma.PrismaClientKnownRequestError;
}
module.exports = { handleDbError, checkIfDbError };
