import mongoose from "mongoose";
import {data} from "./database";
import srs from "secure-random-string";


export class Database {
    public async CreateUser(email, password): Promise<any> {
        let userDB = new data.user({
            email: email,
            password: password,
            rcode: srs({length:40}),
            verified: false,
        });
        userDB.save();
        return userDB;
    }
    public async GetApiKey(api): Promise<any> {
        let userDB = await data.apikey.findOne({key:api});
        if(userDB) return userDB;
    }
    public async DeleteApiKey(api): Promise<any> {
        let userDB = await data.apikey.findOne({key:api});
        userDB.delete();
    }
    public async CreateApiKey(token): Promise<any> {
        let apiDB = new data.apikey({
            key: srs({length:20}),
            token: token
        });
        apiDB.save();
        return apiDB;

    }
    public async GetUserViaToken(token): Promise<any> {
        let userDB = await data.user.findOne({token:token});
        if(userDB) return userDB;
    }
    public async GetRedirect(key): Promise<any> {
        let rDB = await data.redirect.findOne({key: key});
        if(key) return key;
    }
    public async GetAllKeys(token): Promise<any> {
        let apikeyDB = await data.apikey.find({token: token});
        if(apikeyDB) return apikeyDB;
    }
    public async CreateRedirect(token): Promise<any> {
        let rDB = new data.redirect({
            key: srs({length:60}),
            token: token
        })
        rDB.save();
        return rDB;
    }
    public async GetUserViaEmail(email): Promise<any> {
     let userDB = await data.user.findOne({email: email});
        if(userDB) return userDB;
    }
    public async GetUser(email, password): Promise<any> {
     let userDB = await data.user.findOne({email: email, password: password});
        if(userDB) return userDB;
    }
    public async deleteKey(key): Promise<any> {
        let keyDB = await data.redirect.findOne({key:key});
        keyDB.delete();
    }
    public async verified(key): Promise<any> {
        let auserDB = await data.auser.findOne({key: key});
        
        if(auserDB){
            if(auserDB.type !== 'verify') return false;
            let userDB = await data.user.findOne({token: auserDB.token});
            userDB.verified = true;
            userDB.save();
            auserDB.delete();
            return true;
        } else {
            return false;
        }
    }
    public async CreateReset_Verify(token, type): Promise<any> {
        if(type === 'verify'){
            let auserDB = new data.auser({
                key: srs({length:40}),
                token: token,
                type: 'verify'
            });
            auserDB.save();
            return auserDB;
        } else {
            let auserDB = new data.auser({
                key: srs({length:50}),
                token: token,
                type: 'reset'
            });
            auserDB.save();
            return auserDB;
        }
    }
    public async reset(key): Promise<any> {
        let auserDB = await data.auser.findOne({key: key});
        if(auserDB){
            if(auserDB.type !== 'reset') return false;
            let token = auserDB.token;
            auserDB.delete();
            return token;
            
        } else return false;
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