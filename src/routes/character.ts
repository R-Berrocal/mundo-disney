import {Router, IRouter} from 'express';
import { createCharacter, deleteCharacter, getCharacters, updateCharacter } from '../controllers/character';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate_fields';

const router:IRouter= Router();

//Get Characters
router.get("/",getCharacters);

//Create Character
router.post("/",[
    check("name","name is required").not().isEmpty().isLength({max:50}),
    validateFields
],createCharacter);

router.put("/:id",updateCharacter)
router.delete("/:id",deleteCharacter)

export default router;