
// import mongoose = require("mongoose")
// const User =mongoose.model("User");
import User from "./models/user";
import { Strategy as JwtStrategy } from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import env from "./utilities/validateEnv"
import "dotenv/config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.ACCESS_TOKEN_SECRET,
  
};
const strategy = new JwtStrategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub })
    .then((user) => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((err) => done(err, false));
});

// TODO
// module.exports = (passport:any) => {
//   passport?.use(strategy);
// };
export const config =(passport : any)=>{
  passport?.use(strategy)
}