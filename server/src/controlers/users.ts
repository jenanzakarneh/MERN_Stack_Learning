import { RequestHandler } from "express"
import createHttpError from "http-errors";
import userModel from "../models/user";
import bcrypt from 'bcryptjs'
import { issueJwt } from "../utilities/jwtUtils";

interface singUpBody{
    username?:string,
    email?:string,
    password?:string
}
export const singUp:RequestHandler<unknown,unknown,singUpBody,unknown>=async (req,res,next)=>{
    const username=req.body.username;
    const email=req.body.email;
    const passwordRaw=req.body.password;
    try {
        if(!username || !email || !passwordRaw)
        throw createHttpError(400,'Paratmeters are missing. Please fill them and try again.');
        const existingUsename =await userModel.findOne({
            usename:username
        });
        if(existingUsename)
        throw createHttpError(409,"This username is reqestered. Please try another one or login instead.");
        const  existingEmail=await userModel.findOne ({
            email:email
        });
        if(existingEmail)
        throw createHttpError(409,"This email is reqestered. Please try another one or login instead.");

        const hashedPassword =await bcrypt.hash(passwordRaw,10);
        const user =await userModel.create({
            usename:username,
            email:email,
            password :hashedPassword
        });
        res.status(201).json(user);

    } catch (error) {
        next(error)
    }
}
interface SignInbody {
    username?:string,
    password?:string,
}

export const signIn:RequestHandler<unknown,unknown,SignInbody,unknown> =async (req,res,next)=>{
const username = req.body.username;
const password =req.body.password;
try {
    if(!username || !password)
    throw createHttpError(400,'Missing parameteres.');

    const user = await userModel.findOne({usename:username}).select('+email +password').exec();
    if(!user)
    throw createHttpError(401,'Invalid credentials.');

    const passwordMatch = await bcrypt.compare(password,user.password);
    if(!passwordMatch)
    throw createHttpError(401,'Invalid credentials.');
    //create token for the user and send it back
    const token = issueJwt(user._id.toString());

    res.status(201).json(token);
} catch (error) {
    next(error);
}
}