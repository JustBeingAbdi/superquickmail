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
}

export class Connect {
    public async connect(urlstring): Promise<any> {
        mongoose.connect(urlstring, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}