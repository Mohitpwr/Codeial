const nodeMailer = require('../confiq/nodemailer');
exports.sendResetPasswordLink =(ResetPasswordToken,user) =>{
    let htmlString = nodeMailer.renderTemplate({ResetPasswordToken:ResetPasswordToken,user:user},'/reset_password_link.ejs');
    nodeMailer.transporter.sendMail({
        from: 'Mohit.55pwr@gmail.com',
        to: user.email,
        subject:`Reset Password`,
        html: htmlString

    }, (err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Access Token', htmlString);
        console.log('Mail delivered',info);
        return;


    });
}