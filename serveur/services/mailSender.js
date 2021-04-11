const __config = require('../config.json')
const nodemailer = require("nodemailer");

class mailSender {
    constructor() {
        this.smtpTransport = nodemailer.createTransport("SMTP", {
            service: "Gmail",
            port: 465,
            auth: {
                user: __config.MailSender.mail,
                pass: __config.MailSender.password
            }
        });

    }

    sendMail(email, token, callback) {
        const mailOptions = {
            to: email,
            subject: `Please confirm your Email account`,
            html: `Hello,<br> Please Click on the link to verify your email.<br><a href=http://localhost:3000/VerifyEmail?token=${token}>Click here to verify</a>`
        }
        this.smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                callback(error)
            } else {
                callback(response.message)
            }
        });
    }

    sendPassword(email, token, callback) {
        
        const mailOptions = {
            to: email,
            subject: `Password recovery`,
            html: `Hello,<br> Please Click on the link to recover you password.<br><a href=http://localhost:3000/recovery?token=${token}>Click here to recovery</a>`
        }
        this.smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {    
                callback(error)
            } else {
                callback(response.message)
            }
        });
    }
}


module.exports = mailSender;

