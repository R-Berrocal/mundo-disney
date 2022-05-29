import {Router, IRouter} from 'express';
import { createDetailMovies, createMovie, deleteMovie,  getDetailsMovie, getMovies, updateMovie } from '../controllers/movie';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate_fields';

const router:IRouter= Router();

//Get Movies
router.get("/",getMovies);
router.get("/detail",getDetailsMovie);

//Create Character
router.post("/",[
    check("title","title is required").not().isEmpty().isLength({max:50}),
    validateFields
],createMovie);

router.post("/detail",[
    check("movieIdmovie","id movie is required").not().isEmpty(),
    check("genreIdgenre","id genre is required").not().isEmpty(),
    validateFields
],createDetailMovies)

router.put("/:id",updateMovie)
router.delete("/:id",deleteMovie)

export default router;