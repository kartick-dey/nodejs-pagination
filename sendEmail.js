const sgMail = require('@sendgrid/mail');
const mailgun = require("mailgun-js");
require('dotenv').config();

const sendEmailUsingSendgrid = () => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // Sending Verification email using SendGrid
    const message = {
        from: 'kartick.dey1995@gmail.com',
        to: 'kartick_d@pursuitsoftware.biz',
        subject: 'Verify Your Email',
        html: `
    <h4>Hello Kartick,</h4>
    <p>Thank you for registering our website</p>
    <p>Please click on given link or button to activate your account</p>
    <a href='http://localhost:3000/confirmemail?token=emailVerifyToken' ' style="color: blue">Click Here</a>
    <br/>
    <h4>Regards,</h4>
    <h4>Kartick Dey</h4>
    `
    };
    sgMail.send(message)
        .then(() => console.log("Email send through SendGrid: "))
        .catch(error => console.log("Error in sending email verification link: ", error));
}

const sendEmailUsingMailgun = () => {
    const mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    });

    const message = {
        from: 'noreply@kd.com',
        to: 'kartick.dey1995@gmail.com',
        subject: 'Verify your email to activate account',
        html: `
        <h4>Hello Kartick,</h4>
    <p>Thank you for registering our website</p>
    <p>Please click on given link or button to activate your account</p>
    <a href='http://localhost:3000/confirmemail?token=emailVerifyToken' ' style="color: blue">Click Here</a>
    <br/>
    <h4>Regards,</h4>
    <h4>Kartick Dey</h4>
        `
    };
    mg.messages().send(message, (error, body) => {
        if (error) {
            console.log("Error in sending email verification link: ", error)
        } else {
            console.log("Email send through Mailgun: ", body)
        }
    });
}

sendEmailUsingSendgrid();
sendEmailUsingMailgun()
