import { Document, Model, model, Schema } from "mongoose";
import srs from "secure-random-string";

export interface IApiUser extends Document {
    name:string,
    token:string,
    email:string,
    password:string
    
    

}

export const ApiUserS: Schema = new Schema({
    name: { type: String },
    token: { type: String, default: srs({length:60})},
    email: { type: String },
    password: { type: String},
})


export const User: Model<IApiUser> = model("User", ApiUserS);