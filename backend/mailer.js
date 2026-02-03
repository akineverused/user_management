import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendConfirmationEmail = async (email, token) => {
    const link = `${process.env.BACKEND_URL}/confirm/${token}`;

    await sgMail.send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: 'Confirm your email',
        html: `
      <h3>Confirm your registration</h3>
      <p>Click the link below:</p>
      <a href="${link}">${link}</a>
    `
    });

    console.log('Confirmation email sent to', email);
};