import express from "express";
import nodemailer from "nodemailer";
import {Database, Connect} from "./../Database";
import * as Config from "../lib/DefaultConfig";
import {Mail} from "../Mail";
import bodyparser from "body-parser";
import path from "path";
import ejs from "ejs";
import srs from "secure-random-string";
import axios from "axios";
import {DefaultConfig, EmailConfig, ServerConfig, OuathConfig } from "./../lib";
import {GoogleOuath} from "./../Auth";

export class Api {
    public database: Database = new Database();
    public mail: Mail = new Mail();
    public google: GoogleOuath = new GoogleOuath();
    public async init(port): Promise<any> {
new Connect().connect(Config.database);
    
    let api = express();
    api.use(bodyparser.json());
    api.use(bodyparser.urlencoded({ extended: true }));
    api.engine("html", ejs.renderFile);
    api.set('view engine', 'ejs');
    api.set('views', path.join(__dirname, "./../views"));
    api.use(express.static(path.join(__dirname, "./../public")));
    api.set('trust proxy', true)

    api.get("/", async(req, res) => {
        res.render("api/index", {
            db: this.database
        });
    })
    
    api.get("/users/apikey/find", async(req, res) => {
        let key = req.query.key;
        let data = await this.database.GetApiKey(key);
        res.send(data.token);
        console.log(data.token);
    })
    api.get("/app", async(req, res) => {
        let redirect = req.query.redirect || "/app";
        let usertoken = req.query.token;
        if(!usertoken) return res.redirect("/");
        let userDB = await this.database.GetUserViaToken(usertoken);
        if(!userDB) return res.redirect("/");
        let keyDB = await this.database.CreateRedirect(usertoken);
        res.redirect(`${ServerConfig.appurl}/api/redirect?key=${keyDB.key}&redirect=${redirect}`);


    });
    api.get("/ouath/github/callback", async(req, res) => {
        var access_token;
 const requestToken = req.query.code
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${OuathConfig.github_clientID}&client_secret=${OuathConfig.github_clientsecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
  }).then((response1) => {
    access_token = response1.data.access_token;
    axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_token
    }
  }).then(async(response) => {
      let user = await this.database.GetUserViaEmail(response.data.email);
      if(user){
          if(!user.ouath){
res.redirect("/login?message=email_reg_ouath");
      }
    }
      if(!user){
          user = await this.database.CreateUser(response.data.email, "Ouath");
      }

      user.ouath = true;
      user.save();

    res.render('api/access/ouath/github',{ user: response.data, token: user.token });
  })
    
  })

    });

    api.get("/ouath/google/callback", async(req, res) => {
        if(!req.query.code) return res.redirect("/login?message=No+Authorization+Token");
        let google_login = await this.google.GetUser(req.query.code);
        let userDB = await this.database.GetUserViaEmail(google_login.email);
        if(userDB){
            if(!userDB.ouath){
                return res.redirect("/login?message=email_reg_ouath");
            }
        }
        if(!userDB){
            userDB = await this.database.CreateUser(google_login.email, 'Ouath');
            userDB.ouath = true;
            userDB.save();
        }

        res.render("api/access/ouath/google", {userData: google_login, token: userDB.token});
    })

    
    api.get("/users/verify/token", async(req, res) => {
        let token = req.query.token;
        let data = await this.database.GetUserViaToken(token);
        if(!data || !token) return res.send("No");
        res.send(data.id);
    })
    api.get("/login", async(req, res) => {
        let googlel = await this.google.getGoogleAuthURL();
        if(!req.query.token){
        res.render("api/access/login", {
            db: this.database,
            client_id: OuathConfig.github_clientID,
            config: OuathConfig,
            google: googlel,
        });
    } else {
        res.redirect(ServerConfig.appurl + `/login?token=${req.query.token}&redirect=${req.query.redirect}`)
    }
    })
    api.get("/users/verify/header/token", async(req, res) => {
        let token = req.query.token;
        if(token === 'Hey' && 'hey') return res.send("No");
        let data = await this.database.GetUserViaToken(token);
        if(!data) return res.send("No");
        res.send(data.name);
    })
    api.post("/api/email/html/send", async(req, res) => {
        
        let to = req.body.to;
        let from = req.body.from
        let subject = req.body.subject


        let body = req.body.message
        
        let email = await this.mail.SendMailHTMl(from, to, subject, body);
        if(email === 404) return res.status(404).send({
            message: "Invalid Query's"
        })

        res.status(200).send({
            id: email,
            to: to,
        });
        
    });
    api.get("/api/email/html/send", async(req, res) => {
        if(!EmailConfig.allowGet) return;
        let to = req.query.to;
        let from = req.query.from;
        
        let subject = req.query.subject +''.replace("%20", " ");


        let body = req.query.body +''.replace("%20", " ");
        if(!body) return res.status(401).end();
        let email = this.mail.SendMailHTMl(from, to, subject, body);

        res.status(200).send({
            message: email,
            status: 200,
        });
    })
    api.post("/api/email/text/send", async(req, res) => {
        if(EmailConfig.authorization){
        let authorization = req.headers.authorization;
        if(!authorization) return res.status(401).send({
            message: "Invalid Authorization",
            status: 401
        });
    
    }
        let to = req.query.to;
        let from = req.query.from;
        let subject = req.body.subject || null


        let body = req.body.message;
        if(!body) return res.status(401).end();
        let email = await this.mail.SendMailTEXT(from, to, subject, body);
        if(email === 404) return res.status(404).send({
            message: "Invalid Query's"
        })

        res.status(200).send({
            id: email,
            to: to,
        });
        
    });
    api.get("/api/email/text/send", async(req, res) => {
        if(!EmailConfig.allowGet) return;
        let to = req.query.to;
        let from = req.query.from;
        
        let subject = req.query.subject


        let body = req.query.body
        if(!body) return res.status(401).end();
        let email = this.mail.SendMailTEXT(from, to, subject, body);

        res.status(200).send({
            message: email,
            status: 200,
        });
    })
    api.post("/users/login", async(req, res) => {
        let email = req.query.email;
        let password = req.query.password;
        let emailDB = await this.database.GetUserViaEmail(email);
        if(!emailDB) return res.send("Email");
        let userDB = await this.database.GetUser(email, password);
        if(!userDB) return res.send("Password");
        res.send(userDB.token);
        
    });
    
    api.post("/users/signup", async(req, res) => {
        let email = req.query.email;
        let password = req.query.password;
        let emailDB = await this.database.GetUserViaEmail(email);
        if(emailDB) return res.send("Email");
        let userDB = await this.database.CreateUser(email, password);
        
   
        res.send(`${userDB.token} ${userDB.rcode}`);
    })
    api.get("/logout", async(req, res) => {
        
        res.render("api/access/logout", {
            config: ServerConfig
        });
    })

    api.listen(port);
    console.log("Webserver is online on port " + port)
    }
}
