import dotenv from 'dotenv';
import express,{ Application } from 'express';
import cors from 'cors';
import  auth  from './routes/auth';
import  {dbConnection}  from './db/db_connection';
dotenv.config();

const app:Application = express();

//db connection
dbConnection();

// Middlewares

//cors
app.use(cors());
        
//lectura del body
app.use(express.json());


//Routes
app.use("auth",auth)


//listen

app.listen(process.env.PORT,()=>console.log("server running in the port",process.env.PORT))

export default app;