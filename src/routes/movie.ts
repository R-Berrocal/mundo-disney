import {Router, IRouter} from 'express';
import { createMovie, deleteMovie, getMovies, updateMovie } from '../controllers/movie';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate_fields';

const router:IRouter= Router();

//Get Movies
router.get("/",getMovies);

//Create Character
router.post("/",[
    check("title","title is required").not().isEmpty().isLength({max:50}),
    validateFields
],createMovie);

router.put("/:id",updateMovie)
router.delete("/:id",deleteMovie)

export default router;