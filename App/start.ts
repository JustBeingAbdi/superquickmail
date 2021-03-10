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
export class App {
    public database: Database = new Database();
    public async init(port): Promise<any> {
new Connect().connect(Config.database);
    
    let app = express();

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.engine("html", ejs.renderFile);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, "./../views"));
    app.use(express.static(path.join(__dirname, "./../public")));
    app.set('trust proxy', true)

    app.get("/", async(req, res) => {
        res.redirect("/app");
    })
    app.get("/app", async(req, res) => {
        res.render("app/app");
    })
    app.get("/api", async(req, res) => {
        res.redirect("https://superquickemail.cf");
    })

    app.get("/api/redirect", async(req, res) => {
        let key = req.query.key;
        if(!key) return res.redirect("/api");
        let keyDB = await this.database.GetRedirect(key);
        if(!keyDB) return res.redirect("/api");
        let redirect = req.query.redirect || '/app'
        keyDB.delete();
        res.redirect(redirect);
    })
    app.post("/users/manage/email", async(req, res) => {
        let email = req.query.email;
        let token = req.query.token;

        let userDB = await this.database.GetUserViaToken(token);
        if(email === userDB.email) return res.send("The Email you provided is the Same as the Email");
        userDB.email = email;
        userDB.save();
        res.send("Email Changed!");

        
    })
    app.get("/manage/account/api/management", async(req, res) => {
        let token = req.query.token;
        if(!token) return res.redirect("/app");
        let userDB = await this.database.GetUserViaToken(token);
        if(!userDB) return res.redirect("/app");
        let keys = await this.database.GetAllKeys(token);
        res.render("app/account/api", {
            user: userDB,
            keys: keys
        });
    })

    

    app.listen(port);
    console.log("Webserver is online on port " + port)
    }
}
