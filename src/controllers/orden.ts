import { Request, Response } from 'express';
import { Carrito, Movie, Orden, User } from '../models';

export const getOrden = async (req: Request, res: Response) => {
  try {
    const orden = await Orden.findAll({
        where:{condition:true},
        include:[
            {
                model:Carrito,
                include:[{model:Movie},{model:User}]
            }
        ]
    });
    return res.json({
       orden,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const getOrdenId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orden = await Orden.findByPk(id,{
        include:[
            {
                model:Carrito,
                include:[{model:Movie},{model:User}]
            }
        ]
    });
    if (!orden) {
      return res.status(401).json({
        mgs: 'orden not found',
      });
    }
    return res.json({
       orden,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};
export const getOrdenCarritoId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orden = await Orden.findAll({
        where:{carritoIdcarrito:id},
        include:{
            model:Carrito,
            include:[{model:Movie},{model:User}]
        }
    });
    if (!orden) {
      return res.status(401).json({
        mgs: 'orden not found',
      });
    }
    return res.json({
       orden,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const createOrden = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const idCarrito = body.carritoIdcarrito;

    const carrito = await Carrito.findByPk(idCarrito);
    if(!carrito){
        return res.status(400).json({
            msg: `El id ${idCarrito} not exist in carrito / carritoIdcarrito`,
        });
    }
    await carrito.update({condition:false})
        

    const orden = Orden.build(body);
    await orden.save();

    return res.status(201).json({
      orden,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const updateOrden = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { idorden, ...resto } = req.body;

    const orden = await Orden.findByPk(id);
    if (!orden) {
      return res.status(400).json({
        msg: `Orden not exist in db`,
      });
    }

    await orden.update(resto);
    return res.json({ orden });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const deleteOrden = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orden = await Orden.findByPk(id);
    if (!orden) {
      return res.status(400).json({
        msg: `Orden not exist in db`,
      });
    }

    await orden.destroy();
    res.json({
      orden,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};