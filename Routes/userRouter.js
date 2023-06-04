import express from 'express'
const router = express.Router();
import userController from '../Controller/userController.js';
import validateToken from '../Middleware/validateTokenHandler.js'


router.post('/login',userController.UserLogin)
router.post('/register',userController.UserRegister)
router.get('/current',validateToken, userController.userGet)



export default router