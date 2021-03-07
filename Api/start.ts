import express from "express";
import nodemailer from "nodemailer";
import {Database, Connect} from "./../Database";
import * as Config from "./../Config";
import {Mail} from "../Mail";

export class Api {
    public database: Database = new Database();
    public mail: Mail = new Mail();
    public async init(): Promise<any> {
new Connect().connect(Config.database);
    
    let api = express();

    api.get("/", async(req, res) => {
        res.send("Ok");
    })
    api.post("/api/email/send", async(req, res) => {
        let to = req.query.to;
        let from = req.query.from;
        let subject = req.query.subject;


        let body = req.body;
        if(!body) return res.status(401).end();
        let email = this.mail.SendMail(from, to, subject, req.body);

        res.status(200).send({
            message: email,
            status: 200,
        });
        
    });
    api.get("/api/email/send", async(req, res) => {
        let to = req.query.to;
        let from = req.query.from;
        
        let subject = req.query.subject;


        let body = req.query.body
        if(!body) return res.status(401).end();
        let email = this.mail.SendMail(from, to, subject, body);

        res.status(200).send({
            message: email,
            status: 200,
        });
    })

    api.listen(3000);
    }
}
