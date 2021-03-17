import  {Document, Model, model, Schema } from "mongoose";


export interface IApiKey extends Document {
    key:string,
    token:string
}

export const ApiKeySchema: Schema = new Schema({
    key: { type: String },
    token: { type: String}
})

export const ApiKey: Model<IApiKey> = model("ApiKey", ApiKeySchema);