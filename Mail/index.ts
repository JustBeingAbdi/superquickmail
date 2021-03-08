import nodemailer from "nodemailer";
import * as Config from "../lib/EmailConfig";
import srs from "secure-random-string";
const mailjet = require("node-mailjet").connect(Config.apikey, Config.secretkey);

export class Mail {
    public async SendMailHTMl(fromm, to, subject, text): Promise<any> {
let customID = srs({length:10});
let from = fromm || 'Unknown User';

const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": Config.email,
        "Name": from
      },
      "To": [
        {
          "Email": to,
          "Name": to
        }
      ],
      "Subject": subject,
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
    return 404;
  })

  return customID;

    }

public async SendMailTEXT(fromm, to, subject, text): Promise<any> {
let customID = srs({length:10});
let from = fromm || 'Unknown User';

const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": Config.email,
        "Name": from
      },
      "To": [
        {
          "Email": to,
          "Name": to
        }
      ],
      "Subject": subject,
      "TextPart": text,
      "CustomID": customID
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    return 404;
  })

  return customID;

    }
}