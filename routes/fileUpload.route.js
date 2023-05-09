const Router = require("@koa/router");
const protectRoute = require("../utils/helpers/protectRoute");
const { createDescPhoto } = require("../controllers/uploadFile.controller");

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

router.post(
	"/",

	upload.array("fileNames", 5),
	createDescPhoto
);
router.get("/", (ctx) => {
	ctx.body = "success";
});
module.exports = router.routes();
