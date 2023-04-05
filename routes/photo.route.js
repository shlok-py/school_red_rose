const Router = require("@koa/router");
const protectRoute = require("../utils/helpers/protectRoute");
const photoController = require("../controllers/photo.controller");
const schemaValidate = require("../utils/schema.validation");
const photoSchema = require("../utils/interfaces/photo.interface");
const { v4: uuidv4 } = require("uuid");
const multer = require("@koa/multer");
const router = new Router();

// Set up Multer storage and file filters
const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		const fName = uuidv4();

		const ext = file.originalname.split(".").pop();
		cb(null, `${"_" + fName + "." + ext}`);
	},
	destination: function (req, file, cb) {
		cb(null, `${"public/uploads/" + "/"}`);
	},
});

const fileFilter = function (req, file, cb) {
	// Accept only image files
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Only image files are allowed"));
	}
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get(
	"/:id",

	schemaValidate(photoSchema.photoDetailSchema),
	photoController.fetchPhoto
);
router.get(
	"/",
	schemaValidate(photoSchema.photoListSchema),
	photoController.fetchAllPhotos
);
router.post(
	"/",
	protectRoute,
	schemaValidate(photoSchema.createPhotoSchema),
	upload.array("fileNames", 5),
	photoController.createPhoto
);
router.patch(
	"/:id",
	protectRoute,
	schemaValidate(photoSchema.editPhotoSchema),
	upload.array("fileNames", 5),
	photoController.updatePhotoDetail
);
router.delete(
	"/:id",
	protectRoute,
	schemaValidate(photoSchema.photoDeleteSchema),
	photoController.deletePhoto
);

module.exports = router.routes();
