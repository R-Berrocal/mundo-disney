import {IRouter,Router} from 'express';
import { login, register } from '../controllers/auth';
import {check} from 'express-validator';
import { emailExist } from '../helpers/db-validator';
import { validateFields } from '../middlewares/validate_fields';


const router:IRouter= Router();


router.post("/login",login)

router.post("/register",[
    check("name","name es required").not().isEmpty(),
    check("email","email is required").not().isEmpty().isEmail(),
    check("email").custom(emailExist),
    check("password","password is required / must have more than 6 characters").isLength({min:6}).not().isEmpty(),
    validateFields
],register);

export default router;