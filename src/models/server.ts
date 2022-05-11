import express,{ Application } from 'express';
import cors from 'cors';
import  path  from '../routes/auth';

export default class Server{
    private app:Application;
    private port:string;
    private apiPath={auth:"/auth"};
    constructor(){
        this.app=express();
        this.port=process.env.PORT!;

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

    routes():void{
        this.app.use(this.apiPath.auth,path)
    }

    listen():void{
        this.app.listen(this.port,()=>console.log("server running in the port",this.port))
    }
}