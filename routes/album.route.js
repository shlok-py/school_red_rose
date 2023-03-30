const Router = require("@koa/router");
const protectRoute = require("../utils/helpers/protectRoute");
const albumController = require("../controllers/album.controller");
const schemaValidate = require("../utils/schema.validation");
const albumSchema = require("../utils/interfaces/album.interface");

const router = new Router();

router.get(
	"/categories",
	schemaValidate(albumSchema.albumCategorySchema),
	albumController.findAlbumCategories
);
router.get(
	"/:id",

	schemaValidate(albumSchema.albumDetailSchema),
	albumController.fetchAlbumDetails
);
router.get(
	"/",
	schemaValidate(albumSchema.albumListSchema),
	albumController.fetchAllAlbums
);
router.post(
	"/",
	protectRoute,
	schemaValidate(albumSchema.createAlbumSchema),
	albumController.createAlbum
);
router.patch(
	"/:id",
	protectRoute,
	schemaValidate(albumSchema.editAlbumSchema),
	albumController.updateAlbumDetail
);
router.delete(
	"/:id",
	protectRoute,
	schemaValidate(albumSchema.albumDetailSchema),
	albumController.deleteAlbumDetails
);
module.exports = router.routes();
