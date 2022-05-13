import dotenv from 'dotenv';
import express,{ Application } from 'express';
import cors from 'cors';

import  {dbConnection}  from './db/db_connection';
import { auth, character } from './routes';
dotenv.config();

const app:Application = express();

//db connection
dbConnection();

// Middlewares

//cors
app.use(cors());
        
//body reading
app.use(express.json());


//Routes
app.use("/auth",auth);
app.use("/characters",character);


//listen

app.listen(process.env.PORT,()=>console.log("server running in the port",process.env.PORT))

export default app;