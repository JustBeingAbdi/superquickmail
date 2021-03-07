import { Document, Model, model, Schema } from "mongoose";

export interface IApiUser extends Document {
    id:string,
    email:string,
    password:string,
    service:string
    

}

export const ApiUserS: Schema = new Schema({
    id: { type: String },
    email: { type: String },
    password: { type: String },
    service: { type: String }
})


export const User: Model<IApiUser> = model("User", ApiUserS);