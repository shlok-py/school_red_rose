const Koa = require("koa");
const cors = require("@koa/cors");
const serve = require("koa-static");
const path = require("path");
const { koaBody } = require("koa-body");
const rootRouter = require("./routes/index.route");
const DB = require("./db");
const { changePasswordSchema } = require("./utils/interfaces/auth.interface");
const schemaValidate = require("./utils/schema.validation");
const config = require("./utils/config");
const { checkIfDbError, handleDbError } = require("./utils/errorDbHandler");

DB();

//Route files
const app = new Koa();
const PORT = config.port;
app.use(cors());
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (e) {
		if (checkIfDbError(e)) {
			console.log(e.code, e.meta.cause);

			const errorDetail = handleDbError(e);
			console.log(errorDetail);
			ctx.status = errorDetail?.statusCode || 500;
			ctx.body = errorDetail?.message;
			ctx.app.emit("error", e, ctx);
		} else {
			ctx.status = e.statusCode || 500;
			ctx.body = e.message;
			ctx.app.emit("error", e, ctx);
		}
	}
});
app.use(koaBody());
app.use(rootRouter);

app.on("error", (err) => {
	console.error("An Error has occured... ", err);
});

console.log(
	schemaValidate(changePasswordSchema, {
		oldPassword: "134",
		newPassword: "123",
	})
);
app.use(serve(path.join(__dirname, "/public", "/uploads")));
// console.log(path.join(__dirname, "/public", "/uploads"));
app.listen(PORT, () => {
	// console.log("Server running at: http://localhost:" + PORT);
});
