import {Document, Model, model, Schema } from "mongoose";


export interface IAppRedirect extends Document {
    key:string,
    token:string
}
export const AppSchema: Schema = new Schema({
    key: { type: String },
    token: { type: String },
})
export const AppRedirect: Model<IAppRedirect> = model("AppRedirect", AppSchema);