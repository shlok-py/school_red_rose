const Router = require("@koa/router");
const componentController = require("../controllers/components.controller");
const schemaValidate = require("../utils/schema.validation");
const componentSchema = require("../utils/interfaces/components.interface");
const multer = require("@koa/multer");
const router = new Router();

// Set up Multer storage and file filters
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, `${file.originalname}`);
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
	schemaValidate(componentSchema.componentsDetailSchema),
	componentController.fetchComponentDetails
);
router.get(
	"/",
	schemaValidate(componentSchema.componentsListSchema),
	componentController.fetchAllComponents
);
router.post(
	"/",
	schemaValidate(componentSchema.createComponentsSchema),
	upload.array("fileNames", 5),
	componentController.createComponent
);
router.patch(
	"/:id",
	schemaValidate(componentSchema.editComponentsSchema),
	componentController.updateComponentDetail
);

module.exports = router.routes();
