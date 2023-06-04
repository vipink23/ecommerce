import express from 'express'
const router =express.Router();
import CategoryController from '../Controller/CategoryController.js';


router.get('/' ,CategoryController.CategoryGet)
router.get('/:id',CategoryController.CategoryGetById)
router.post('/', CategoryController.CategoryPost)
router.patch('/:id', CategoryController.CategoryPatch)

export default router