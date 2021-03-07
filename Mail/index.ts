import nodemailer from "nodemailer";
import * as Config from "../Config";
import srs from "secure-random-string";
const mailjet = require("node-mailjet").connect(Config.apikey, Config.secretkey);

export class Mail {
    public async SendMail(fromm, to, subject, text): Promise<any> {
let customID = srs({length:10});
let from = fromm || 'Unknown User';

const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": 'api@superquickemail.cf',
        "Name": from
      },
      "To": [
        {
          "Email": to,
          "Name": to
        }
      ],
      "Subject": subject,
      "TextPart": subject,
      "HTMLPart": text,
      "CustomID": customID
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })

  return customID;

    }
}