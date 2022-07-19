import { Request, Response } from 'express';
import { Carrito, Movie, User } from '../models';

export const getCarrito = async (req: Request, res: Response) => {
  try {
    const carrito = await Carrito.findAll({
        include:[
            {
                model:User
            },
            {
                model:Movie
            }
        ]
    });
    return res.json({
       carrito,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const getCarritoId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const carrito = await Carrito.findByPk(id);
    if (!carrito) {
      return res.status(401).json({
        mgs: 'carrito not found',
      });
    }
    return res.json({
       carrito,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};
export const getCarritoUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const carrito = await Carrito.findAll({
        where:{userIduser:id},
        include:{
            model:Movie
        }
    });
    if (!carrito) {
      return res.status(401).json({
        mgs: 'carrito not found',
      });
    }
    return res.json({
       carrito,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const createCarrito = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const idUser = body.userIduser;
    const idMovie = body.userIduser;


    const user = await User.findByPk(idUser);
    const movie = await Movie.findByPk(idMovie);
    if(!user){
        return res.status(400).json({
            msg: `El id ${idUser} not exist in user / userIduser`,
        });
    }
    if(!movie){
        return res.status(400).json({
            msg: `El id ${idMovie} not exist in user / userIduser`,
        });
    }
        

    
    if(!body.movieIdmovie){
        return res.status(400).json({
            msg: `El id ${body.movieIdmovie} not exist in movie / movieIdmovie`,
        });
    }
    const carrito = Carrito.build(body);
    await carrito.save();

    return res.status(201).json({
      genre: carrito,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const updateCarrito = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { idcarrito, ...resto } = req.body;

    const carrito = await Carrito.findByPk(id);
    if (!carrito) {
      return res.status(400).json({
        msg: `Carrito not exist in db`,
      });
    }

    await carrito.update(resto);
    return res.json({ carrito });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const deleteCarrito = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const carrito = await Carrito.findByPk(id);
    if (!carrito) {
      return res.status(400).json({
        msg: `Carrito not exist in db`,
      });
    }

    await carrito.destroy();
    res.json({
      carrito,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};