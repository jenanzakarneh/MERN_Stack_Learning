import app from './app'
import mongoose from "mongoose";
import env from "./utilities/validateEnv"
import "dotenv/config";

const PORT= env.PORT;



mongoose.connect(env.MONGO_CONNECT_STRING).then(()=>{
    console.log(`Connected to database`);

    app.listen(PORT,()=>{
        console.log(`App is running on port #${PORT}`)
    });
}
).catch(console.error);