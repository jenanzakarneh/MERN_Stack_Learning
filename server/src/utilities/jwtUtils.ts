import jwt from "jsonwebtoken";
import env from "./validateEnv"
import "dotenv/config";
export const issueJwt = (userId:string)=>{
    

    const expiresIn = "1d";
  
    const payload = {
      sub: userId,
      iat: Date.now(),
    };
  
    const signedToken = jwt.sign(
      payload,
      env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: expiresIn,
      }
    );
  
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn,
    };
}