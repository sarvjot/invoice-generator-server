import express from 'express';
import { itemController } from '../controllers/index.js';

const router = express.Router();

router.post('/', itemController.createController);
router.get('/', itemController.listController);
router.put('/:id', itemController.editController);
router.delete('/:id', itemController.deleteController);

export default router;
