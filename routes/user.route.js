const Router = require("@koa/router");
const protectRoute = require("../utils/helpers/protectRoute");
const schemaValidate = require("../utils/schema.validation");
const userSchema = require("../utils/interfaces/user.interface");
const {
	fetchAllUsers,
	fetchUserDetail,
	updateRole,
	updateUserDetail,
	deleteUser,
} = require("../controllers/user.controller");

const router = new Router();

router.get(
	"/:id",
	schemaValidate(userSchema.userDetailSchema),
	fetchUserDetail
);
router.get("/", schemaValidate(userSchema.usersListSchema), fetchAllUsers);
router.patch(
	"/:id",
	protectRoute,
	schemaValidate(userSchema.editUserSchema),
	updateUserDetail
);
router.patch(
	"/change-role/:id",
	protectRoute,
	schemaValidate(userSchema.editUserRoleSchema),
	updateRole
);
router.delete(
	"/:id",
	protectRoute,
	schemaValidate(userSchema.userDeleteSchema),
	deleteUser
);

module.exports = router.routes();
