import express from 'express';
import { analyzeBazi } from '../controllers/baziController';

const router = express.Router();

router.post('/analyze', analyzeBazi);

export default router;
