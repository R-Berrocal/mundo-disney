import { Router, IRouter } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate_fields';
import { createOrden, deleteOrden, getOrden, getOrdenCarritoId, getOrdenId, updateOrden } from '../controllers/orden';

const router: IRouter = Router();

//Get Movies
router.get('/', getOrden);
router.get('/:id', getOrdenId);
router.get('/carrito/:id', getOrdenCarritoId);

//Create Character
router.post(
  '/',
  [
    check('carritoIdcarrito', 'carritoIdcarrito is required').not().isEmpty(),
    validateFields],
  createOrden
);

router.put('/:id', updateOrden);
router.delete('/:id', deleteOrden);

export default router;