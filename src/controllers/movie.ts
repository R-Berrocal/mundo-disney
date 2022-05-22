import { Request, Response } from "express";
import {Movie} from '../models';

export const getMovies=async(req:Request,res:Response)=>{
    try {
        const movies = await Movie.findAll();
        return res.json({
            movies
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
}
export const createMovie =async (req:Request,res:Response) => {
       
       try {
           const {body} = req;
           const movie = Movie.build(body);
           await movie.save();
    
           return res.status(201).json({
               movie
            })       
       } catch (error) {
           console.log(error);
           res.status(500).json({
               msg:`Talk with admin`
           })
       }        

}


export const updateMovie = async(req:Request,res:Response)=>{
    try {
        const {id}= req.params;    
        const {idmovie,...resto}= req.body;
    
        const movie = await Movie.findByPk(id);
        if(!movie){
            return res.status(400).json({
                msg: `Movie not exist in db`
            })
        }
        
        await movie.update(resto);
        return res.json({movie})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
}

export const deleteMovie = async(req:Request,res:Response)=>{
    try {
        const {id}= req.params;
        const movie = await Movie.findByPk(id);
        if(!movie){
          return res.status(400).json({
              msg:`Movie not exist in db`
          })
        }
    
        await movie.destroy();
        res.json({
            delete:movie
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Talk with admin`
        })
    }
}