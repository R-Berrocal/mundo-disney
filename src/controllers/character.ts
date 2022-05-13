import { Request, Response } from "express";
import {Character} from '../models';

export const getCharacters=async(req:Request,res:Response)=>{
    const characters = await Character.findAll({attributes:["name","image"]})
    return res.json({
        characters
    })
}
export const createCharacter =async (req:Request,res:Response) => {
       const {body} = req;
       const character = Character.build(body);
       await character.save();

       return res.status(201).json({
           character
        })

}