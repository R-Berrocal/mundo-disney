import { Request, Response } from 'express';
import { Genre } from '../models';

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.findAll();
    return res.json({
      genres,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const getGender = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gender = await Genre.findByPk(id);
    if (!gender) {
      return res.status(401).json({
        mgs: 'gender not found',
      });
    }
    return res.json({
      gender,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const createGenre = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const genre = Genre.build(body);
    await genre.save();

    return res.status(201).json({
      genre,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { idgenre, ...resto } = req.body;

    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(400).json({
        msg: `Genre not exist in db`,
      });
    }

    await genre.update(resto);
    return res.json({ genre });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(400).json({
        msg: `Genre not exist in db`,
      });
    }

    await genre.destroy();
    res.json({
      delete: genre,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};
