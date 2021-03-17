import { OuathConfig, ServerConfig } from "../lib";
import querystring from "querystring";
import axios from "axios";
export class GoogleOuath {
    public async getGoogleAuthURL(): Promise<any> {
        const baseUrl = 'https://accounts.google.com/o/ouath2/v2/auth';
        const options = {
            redirect_uri: `${ServerConfig.apiurl}/ouath/google/callback`,
            client_id: OuathConfig.google_clientID,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',

            ].join(' '),
        };

        return `${baseUrl}?${querystring.stringify(options)}`;
        
    }

    public async GetUser(code): Promise<any>  {
        const url = "https://ouath2.googleapis.com/token";
        const values = {
            code,
            client_id: OuathConfig.google_clientID,
            client_secret: OuathConfig.google_clientSecret,
            redirect_uri: `${ServerConfig.apiurl}/ouath/google/callback`,
            grant_type: 'authorization_code',
        };


        return axios.post(url, querystring.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((res) => res.data)
        .catch((error) => {
            throw new Error(error.message);
        })
    }

    

    
}