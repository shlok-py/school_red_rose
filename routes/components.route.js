const Router = require("@koa/router");
const componentController = require("../controllers/components.controller");
const schemaValidate = require("../utils/schema.validation");
const componentSchema = require("../utils/interfaces/components.interface");
const checkCategory = require("../utils/helpers/fileCategory.helper");
const multer = require("@koa/multer");
const router = new Router();

// Set up Multer storage and file filters
const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		category = checkCategory(req.body.compCategory);
		//console.log(category);
		cb(null, `${category + "_" + file.originalname} `);
	},
	destination: function (req, file, cb) {
		category = checkCategory(req.body.compCategory);
		cb(null, `${"public/uploads/" + "/" + category}`);
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
	upload.array("fileNames", 5),
	componentController.updateComponentDetail
);
router.delete(
    "/:id",
    schemaValidate(componentSchema.componentsDetailSchema),
    componentController.deleteComponentDetails
);
module.exports = router.routes();
