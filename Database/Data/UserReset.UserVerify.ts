import  {Document, Model, model, Schema } from "mongoose";


export interface IA_User extends Document {
    key:string,
    token:string,
    type:string
}

export const A_UserSchema: Schema = new Schema({
    key: { type: String },
    token: { type: String},
    type: { type: String, default: 'verify' },
})

export const A_User: Model<IA_User> = model("ApiKey", A_UserSchema);