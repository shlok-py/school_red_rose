function sendSignupEmail({ sender, receiver }) {}

async function sendForgotPasswordEmail(sender, receiver) {
    const message = `You are receiving this email because you have requested the reset of a password, Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: admin.email,
      subject: "Password reset token",
      message,
    });
    res.status(200).json({
      success: true,
      data: "Email sent",
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Email could not be sent", 500));
  }
}

module.exports = { sendSignupEmail, sendForgotPasswordEmail };
