import { Request,Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user';
import { generateToken } from '../helpers/generate_token';



export const login = async (req:Request,res:Response)=>{
    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({where:{email}});
        
        //validacion del email
        if(!user?.email){
            return res.status(400).json({
                msg:`User / password wrong -  email`
            })
        }
        
        //validacion del user.condition
        if(!user.condition){
            return res.status(400).json({
                msg: `User / password  wrong - condition: false`
            })
        }

        //validacion password

        const validPasswrod= bcryptjs.compareSync(password,user.password);
        if(!validPasswrod){
            return res.status(400).json({
                msg: `User / password  wrong - password`
            })
        }

        const token = await generateToken(user.iduser);
        return res.json({
            user,
            token
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg:`talk to the administrator`
        })
    }
}
export const register = async(req:Request,res:Response)=>{
    const {body} = req;
    try {
        const user=  User.build(body)
        const salt  = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(body.password,salt);
        await user.save();

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