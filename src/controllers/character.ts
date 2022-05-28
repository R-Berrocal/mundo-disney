import { Request, Response } from "express";
import {Character, Movie, Movie_has_character} from '../models';

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

export const getDetails = async(req:Request,res:Response)=>{
    const details= await Character.findAll({include:{model:Movie}});
    res.json({
        details
    })
}

export const searchByName= async(req:Request, res:Response)=>{
     const {name}=req.params;
     console.log(name);
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

//Para asignar id de peliculas existentes a personajes existentes
export const createDetail = async(req:Request,res:Response)=>{
    try {
        const {movieIdmovie,characterIdcharacter} = req.body;
        const movie = await Movie.findByPk(movieIdmovie);
        const character = await Character.findByPk(characterIdcharacter);
        if(!movie){
            return res.status(400).json({
                msg: `El id ${movieIdmovie} not exist in movie`
            })
        }
        if(!character){
            return res.status(400).json({
                msg: `El id ${characterIdcharacter} not exist in character`
            })
        }
        const movie_has_character = Movie_has_character.build({movieIdmovie,characterIdcharacter});
        await movie_has_character.save();
 
        return res.status(201).json({
            movie_has_character
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




