import {IRouter, Request, Response, Router} from 'express';

const path:IRouter= Router();

path.get("/",(req: Request,res:Response)=>{
    res.send("Hola mundo")
})

export default path;