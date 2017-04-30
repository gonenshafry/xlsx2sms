module.exports.sender = function(message) {
    const nodemailer = require('nodemailer');
    var myservice = message.fromemail.split('@');
        myservice = myservice[1].split(".");
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: myservice[0],
        auth: {
            user: message.fromemail,
            pass: message.pass
        }
    });
    // setup email data with unicode symbols
    mailOptions = {
        from: message.fromemail,
        to: message.toemail,
        subject: 'Bill due',
        text: 'Hey. you have to pay '+
                message.bill+' dollars at '+
                message.day,
        html: 'Hey. you have to pay '+
                message.bill+' dollars at '+
                message.day
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions,(err,info) => {
        if (err) return console.log(err);
        console.log('Message '+info.messageId+' sent: '+info.response);
    });
    return true;
}