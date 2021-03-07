import { Document, Model, model, Schema } from "mongoose";
import srs from "secure-random-string";

export interface IApiUser extends Document {
    id:string,
    token:string,
    service:string
    

}

export const ApiUserS: Schema = new Schema({
    id: { type: String },
    token: { type: String, default: srs({length:60})},
    service: { type: String }
})


export const User: Model<IApiUser> = model("User", ApiUserS);