import express, { NextFunction, Request,Response } from "express";
import notesRoutes from "./routes/notes";
import usersRoutes from "./routes/users";
import morgan from 'morgan';
import createHttpError ,{isHttpError}from "http-errors";
import passport from "passport";
import { config } from "./passport";
const app = express();


// Pass the global passport object into the configuration function
config(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(express.json());

app.use("/api/users",usersRoutes);
app.use("/api/notes",notesRoutes);

app.use((req,res,next)=>{
    next(createHttpError(404,"Endpoint not found"));
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown , req:Request,res:Response,next:NextFunction)=>{//error handler always should be at the bottom
    console.error(error);
    let errorMessage='An unknown error occured ';
    let status=500;
    if(isHttpError(error)){
        status=error.status;
        errorMessage=error.message
    }
    res.status(status).json({error: errorMessage});
});
export default app;