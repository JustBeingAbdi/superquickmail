import nodemailer from "nodemailer";
import * as Config from "../../Config";

export class Mail {
    public async SendMail(from, to, subject, text): Promise<any> {
        var mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Config.email,
    pass: Config.password
  }
});


var mailOptions = {
  from: from,
  to: to,
  subject: subject,
  text: text
};

mail.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
    }
}