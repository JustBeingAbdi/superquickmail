import express from "express";
import nodemailer from "nodemailer";
import {Database, Connect} from "./../Database";
import * as Config from "./../Config";
import * as Gmail from "./../Mail/Gmail/mail";

export class Api {
    public database: Database = new Database();
    public async init(): Promise<any> {
new Connect().connect(Config.database);
    
    let api = express();

    api.get("/", async(req, res) => {
        res.send("Ok");
    })
    api.post("/email/send/default", async(req, res) => {
        let to = req.query.to;
        let from = req.query.from;

        let body = req.body;
        if(!body) return res.status(401).end();
        
    })
    api.get("/send/test-email/", async(req, res) => {
new Gmail.Mail().SendMail("lg.tv.her.er.jeg@gmail.com", "lg.tv.her.er.jeg@yandex.com", "Hi", "Hi");
    })

    api.listen(3000);
    }
}