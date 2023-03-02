const jwt = require("jsonwebtoken");
const secret = "12312323";

function protectRoute(ctx, next) {
	const authorizationHeader = ctx.headers.authorization;
	if (!authorizationHeader) {
		ctx.throw(401, "Authorization header is required");
	}

	const token = authorizationHeader.replace("Bearer ", "");
	try {
		const payload = jwt.verify(token, secret);
		ctx.state.user = payload; // set user object in state
		return next();
	} catch (err) {
		ctx.throw(401, err.message);
	}
}

module.exports = protectRoute;
