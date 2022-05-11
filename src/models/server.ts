import express,{ Application } from 'express';
import cors from 'cors';
import  router  from '../routes/auth';
import  db  from '../db/db_connection';

export default class Server{
    private app:Application;
    private port:string;
    private apiPath={auth:"/auth"};
    constructor(){
        this.app=express();
        this.port=process.env.PORT!;

        //db
        this.dbConnection();
        //middlewares
        this.middleware();

        //Routes
        this.routes()
    }

    middleware():void{
        //cors
        this.app.use(cors());
        
        //lectura del body
        this.app.use(express.json());

    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Connection has been established succesfully')
        } catch (error:any) {
            throw new Error(error);
        }
    }

    routes():void{
        this.app.use(this.apiPath.auth,router)
    }

    listen():void{
        this.app.listen(this.port,()=>console.log("server running in the port",this.port))
    }
}