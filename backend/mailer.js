import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendConfirmationEmail = async (email, token) => {
    const link = `${process.env.BACKEND_URL}/confirm/${token}`;

    await transporter.sendMail({
        from: `"User Management" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Confirm your email',
        html: `
      <h3>Confirm your registration</h3>
      <p>Click the link below to activate your account:</p>
      <a href="${link}">${link}</a>
    `
    });
};