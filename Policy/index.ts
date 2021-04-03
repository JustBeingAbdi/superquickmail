import express from "express";
import path from "path";
import bodyparser from "body-parser";
import ejs from "ejs";
import { ServerConfig } from "./../lib";

export class Server {
    public async init(port): Promise<any> {
       
        let app = express();
        

    app.use(bodyparser.json());
  
    app.use(bodyparser.urlencoded({ extended: true }));
    app.engine("html", ejs.renderFile);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, "./../views/policy"));
    
    app.set('trust proxy', true);
    


    app.get("/", async(req, res) => {
        res.render("index", {
            config: ServerConfig
        });
    });
    app.get("/reset", async(req, res) => {
        res.render("reset");
    })
    

    app.listen(ServerConfig.port);
        console.log('Webserver online on port ' + port);



    }
}
