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

const router = new Router();

router.post("/register", schemaValidate(authSchema.signUpSchema), signup);
router.post("/login", schemaValidate(authSchema.signInSchema), signin);
router.patch(
	"/change-password",
	schemaValidate(authSchema.changePasswordSchema),
	changePassword
);
router.post(
	"/forgot-password",
	schemaValidate(authSchema.changePasswordSchema),
	forgotPassword
);
router.post(
	"/get-email",
	schemaValidate(authSchema.getEmailSchema),
	userIDPassword
);

module.exports = router.routes();
