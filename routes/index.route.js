const authRoute = require("./auth.route");
const Router = require("@koa/router");
const componentsRoute = require("./components.route");
const userRoute = require("./user.route");

const router = new Router();
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/comp", componentsRoute);

module.exports = router.routes();
