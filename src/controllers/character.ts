import { Request, Response } from "express";
import {Character} from '../models';

export const getCharacters=async(req:Request,res:Response)=>{
    try {
        const characters = await Character.findAll({attributes:["name","image"]})
        return res.json({
            characters
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
}
export const createCharacter =async (req:Request,res:Response) => {
       
       try {
           const {body} = req;
           const character = Character.build(body);
           await character.save();
    
           return res.status(201).json({
               character
            })       
       } catch (error) {
           console.log(error);
           res.status(500).json({
               msg:`Talk with admin`
           })
       }        

}


export const updateCharacter = async(req:Request,res:Response)=>{
    try {
        const {id}= req.params;    
        const {idcharacter,...resto}= req.body;
    
        const character = await Character.findByPk(id);
        if(!character){
            return res.status(400).json({
                msg: `Character not exist in db`
            })
        }
        
        await character.update(resto);
        return res.json({character})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
}

export const deleteCharacter = async(req:Request,res:Response)=>{
    try {
        const {id}= req.params;
        const character = await Character.findByPk(id);
        if(!character){
          return res.status(400).json({
              msg:`Character not exist in db`
          })
        }
    
        await character.destroy();
        res.json({
            delete:character
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
}