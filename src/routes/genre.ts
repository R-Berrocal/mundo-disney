import { Router, IRouter } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate_fields';
import { createGenre, deleteGenre, getGender, getGenres, updateGenre } from '../controllers/genre';
import { genreExist } from '../helpers/db-validator';

const router: IRouter = Router();

//Get Movies
router.get('/', getGenres);
router.get('/:id', getGender);

//Create Character
router.post(
  '/',
  [check('name', 'name is required').not().isEmpty().isLength({ max: 50 }).custom(genreExist), validateFields],
  createGenre
);

router.put('/:id', updateGenre);
router.delete('/:id', deleteGenre);

export default router;
