import mongoose from "mongoose";
import {data} from "./database";


export class Database {
    public async CreateUser(api): Promise<any> {
        let userDB = new data.user({
            id: api
        });
        userDB.save();
        return userDB;
    }
    public async GetUser(api): Promise<any> {
        let userDB = await data.user.findOne({id:api});
        if(userDB) return userDB;
    }
    public async GetUserViaToken(token): Promise<any> {
        let userDB = await data.user.findOne({token:token});
        if(userDB) return userDB;
    }
    public async GetRedirect(key): Promise<any> {
        let rDB = await data.redirect.findOne({key: key});
        if(key) return key;
    }
}

export class Connect {
    public async connect(urlstring): Promise<any> {
        mongoose.connect(urlstring, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}