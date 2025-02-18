const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'farhanfaridianchatgpt@gmail.com', 
        pass: 'dpyr pdjo burj umih' 
    }
});

const sendVerificationEmail = async (email, code) => {
    try {
        await transporter.sendMail({
            from: 'farhanfaridianchatgpt3@gmail.com',
            to: email,
            subject: 'Your FGPT Verification Code',
            text: `Hello! Welcome to FGPT.\nFGPT is a large language model trained by Farhan Faridian \n\nYour verification code is: ${code}`
        });
        console.log(`Verification code sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendVerificationEmail;
