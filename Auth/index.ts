import { OuathConfig, ServerConfig } from "../lib";
import { google } from 'googleapis';
const oauth2Client = new google.auth.OAuth2(
  OuathConfig.google_clientID,
  OuathConfig.google_clientSecret,
  `${OuathConfig.google_callback}`,
);
import querystring from "querystring";
import axios from "axios";
export class GoogleOuath {
    public async getGoogleAuthURL(): Promise<any> {
        
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes,
      response_type: 'code',
      
    }).replace("amp;", "");
        
    }

    public async GetUser(code): Promise<any>  {
        const { tokens } = await oauth2Client.getToken(code);

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      },
    )
    .then(res => res.data)
    .catch(error => {
      throw new Error(error.message);
    });

  return googleUser;
    }

    

    
}