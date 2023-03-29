const authService = require("../services/auth.service");
const sendEmail = require("../utils/helpers/emailSend");
/**
 * creates new user for the system
 */
async function signup(ctx, next) {
	try {
		const credential = ctx.request.body.credential;
		if (credential) {
			return (ctx.body = await authService.googleSignup());
		} else {
			const { email, password } = ctx.request.body;
			const response = await authService.signup({
				email,
				password,
			});
			const message = `You are receiving this email because you have created an account. Your password is: ${[
				password,
			]}`;
			await sendEmail({
				email: email,
				subject: "Account registration",
				message,
			});
			ctx.body = {
				success: true,
				data: "Email sent",
			};
			return (ctx.body = response);
		}
		//check if user already exists, if not add new user, if yes return message saying email or id already exists
	} catch (err) {
		throw err;
	}
}

/**
 * log user in to the system
 */
async function signin(ctx, next) {
	try {
		const credential = ctx.request.body.credential;
		if (credential) {
			return (ctx.body = await authService.googleSignin(credential));
		} else {
			const { email, password } = ctx.request.body;
			const response = await authService.signin({ email, password });
			return (ctx.body = { data: response, message: "Logged In Sucessfully" });
		}

		// check if user already exists, if exists check password, if password matches send token, if not password don't match message, if not user don't exist, signup
	} catch (err) {
		throw err;
	}
}
/**
 * gets email from the user to change its password of corresponding userID
 */
async function userIDPassword(ctx, next) {
	try {
		const { email } = ctx.request.body;
		//console.log(email);
		if (email) {
			return (ctx.body = await authService.userIDChangePassword(email));
		} else {
			return (ctx.body = "User Id not found");
		}
	} catch (err) {
		throw err;
	}
}
/**
 * sends an email with new password
 */
async function forgotPassword(ctx, next) {
	try {
		const { userId, newPassword } = ctx.request.body;

		// send email with new password after updating db with random password or a password reset link, response must say if your email exists, we have sent you an email, check inbox or spam.
		const { response, email } = await authService.forgotPassword({
			userId,
			newPassword,
		});
		message = `You have requested to change your password. Your new password is ${ctx.request.body.newPassword}`;
		await sendEmail({
			email: email,
			subject: "Forgot Password",
			message,
		});
		ctx.body = {
			success: true,
			data: "Email sent",
		};
		return (ctx.body = "Your new password is changed and sent to your mail");
	} catch (err) {
		ctx.status = err.statusCode || err.status || 500;
		ctx.body = {
			message: err.message,
		};
	}
}

/**
 * updates password if old passwords match
 */
async function changePassword(ctx, next) {
	try {
		const { oldPassword, newPassword, userId } = ctx.request.body;
		// check if old password match, if not say old password don't match, else update with new password
		const response = await authService.changePassword({
			userId,
			oldPassword,
			newPassword,
		});
		return (ctx.body = "password updated successfully");
	} catch (err) {
		ctx.status = err.statusCode || err.status || 500;
		ctx.body = {
			message: err.message,
		};
	}
}

module.exports = {
	signin,
	signup,
	changePassword,
	userIDPassword,
	forgotPassword,
};
