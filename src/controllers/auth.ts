import { Request, Response } from 'express';
import User from '../models/user';



export const login = (req:Request,res:Response)=>{
    res.json("llegaste al login bro")
}
export const register = async(req:Request,res:Response)=>{
    const {body} = req;
    try {
        const user=  User.build(body)
        await user.save();

        //status 201 creado
        return res.status(201).json({
            user
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"hable con el administrador"
        })
    }
}