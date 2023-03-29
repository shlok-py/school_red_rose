const Router = require("@koa/router");
const {
	signup,
	signin,
	changePassword,
	forgotPassword,
	userIDPassword,
} = require("../controllers/auth.controller");
const schemaValidate = require("../utils/schema.validation");
const authSchema = require("../utils/interfaces/auth.interface");
const protectRoute = require("../utils/helpers/protectRoute");
const router = new Router();

router.post("/register", schemaValidate(authSchema.signUpSchema), signup);
router.post("/login", schemaValidate(authSchema.signInSchema), signin);
router.patch(
	"/change-password",

	schemaValidate(authSchema.changePasswordSchema),
	protectRoute,
	changePassword
);
router.post(
	"/forgot-password",
	protectRoute,
	schemaValidate(authSchema.changePasswordSchema),
	forgotPassword
);
router.post(
	"/get-email",
	protectRoute,
	schemaValidate(authSchema.getEmailSchema),
	userIDPassword
);

module.exports = router.routes();
