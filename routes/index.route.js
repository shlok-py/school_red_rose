const authRoute = require("./auth.route");
const Router = require("@koa/router");
const componentsRoute = require("./components.route");
const userRoute = require("./user.route");
const albumRoute = require("./album.route");
const photoRoute = require("./photo.route");

const router = new Router();
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/comp", componentsRoute);
router.use("/album", albumRoute);
router.use("/photo", photoRoute);

module.exports = router.routes();
