import express from 'express';
import { billController } from '../controllers/index.js';

const router = express.Router();

router.post('/', billController.createController);

export default router;
