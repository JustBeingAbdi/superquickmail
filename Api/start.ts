import express from "express";
import nodemailer from "nodemailer";
import {Database, Connect} from "./../Database";
import * as Config from "../lib/DefaultConfig";
import {Mail} from "../Mail";
import bodyparser from "body-parser";
import path from "path";
import ejs from "ejs";
import srs from "secure-random-string";
import {DefaultConfig, EmailConfig, ServerConfig } from "./../lib";
export class Api {
    public database: Database = new Database();
    public mail: Mail = new Mail();
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
        res.render("index", {
            db: this.database
        });
    })
    api.get("/apikey/create", async(req, res) => {
        let id = srs({length:30});
        let data = await this.database.CreateUser(id);
        let responsdata = {
            token: data.token,
            apikey: data.id
        };
        res.send(`${data.id} ${data.token}`)
    })
    api.get("/users/apikey/find", async(req, res) => {
        let key = req.query.key;
        let data = await this.database.GetUser(key);
        res.send(data.token);
        console.log(data.token);
    })
    api.get("/users/verify/token", async(req, res) => {
        let token = req.query.token;
        let data = await this.database.GetUserViaToken(token);
        if(!data) return res.send("No");
        res.send(data.id);
    })
    api.post("/api/email/html/send", async(req, res) => {
        if(EmailConfig.authorization){
        let authorization = req.headers.authorization;
        if(!authorization) return res.status(401).send({
            message: "Invalid Authorization",
            status: 401
        });
        let data = await this.database.GetUser(authorization);
        if(!data) return res.status(401).send({
            message: "Invalid Authorization",
            status: 401
        });
    }
        let to = req.query.to;
        let from = req.query.from;
        let subject = req.query.subject;


        let body = req.body;
        if(!body) return res.status(401).end();
        let email = await this.mail.SendMailHTMl(from, to, subject, req.body);
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
        
        let subject = req.query.subject;


        let body = req.query.body
        if(!body) return res.status(401).end();
        let email = this.mail.SendMailHTMl(from, to, subject, body);

        res.status(200).send({
            message: email,
            status: 200,
        });
    })

    api.listen(port);
    console.log("Webserver is online on port " + port)
    }
}
