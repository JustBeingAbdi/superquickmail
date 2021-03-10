import { Document, Model, model, Schema } from "mongoose";
import srs from "secure-random-string";

export interface IApiUser extends Document {

    token:string,
    email:string,
    password:string
    
    

}

export const ApiUserS: Schema = new Schema({
    
    token: { type: String, default: srs({length:60})},
    email: { type: String },
    password: { type: String},
})


export const User: Model<IApiUser> = model("User", ApiUserS);