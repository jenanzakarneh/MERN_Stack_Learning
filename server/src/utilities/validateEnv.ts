import { cleanEnv, port } from "envalid";
import { str } from "envalid";
import 'dotenv/config';
export default cleanEnv(process.env,{
    MONGO_CONNECT_STRING: str(),
    PORT: port(),
    ACCESS_TOKEN_SECRET:str()
});