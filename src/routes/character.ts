import { Router, IRouter } from 'express';
import {
  createCharacter,
  createDetail,
  deleteCharacter,
  getCharacter,
  getCharacters,
  getDetailsCharacter,
  updateCharacter,
} from '../controllers/character';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate_fields';

const router: IRouter = Router();

//Get Characters
router.get('/', getCharacters);
router.get('/detail', getDetailsCharacter);
router.get('/:id', getCharacter);

//Create Character
router.post(
  '/',
  [check('name', 'name is required').not().isEmpty().isLength({ max: 50 }), validateFields],
  createCharacter
);

router.post('/detail', createDetail);

router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);
export default router;
