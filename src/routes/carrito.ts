import { Router, IRouter } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate_fields';
import { 
    createCarrito, 
    deleteCarrito, 
    getCarrito, 
    getCarritoId, 
    getCarritoUserId, 
    updateCarrito
 } from '../controllers/carrito';

const router: IRouter = Router();

//Get Movies
router.get('/', getCarrito);
router.get('/:id', getCarritoId);
router.get('/user/:id', getCarritoUserId);

//Create Character
router.post(
  '/',
  [
    check('userIduser', 'userIduser is required').not().isEmpty(),
    check('movieIdmovie', 'movieIdmovie is required').not().isEmpty(),
    validateFields],
  createCarrito
);

router.put('/:id', updateCarrito);
router.delete('/:id', deleteCarrito);

export default router;