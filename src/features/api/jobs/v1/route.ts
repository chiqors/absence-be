import { Router } from 'express';
import { getJobs } from './controller.ts';

const router = Router();

router.get('/', getJobs);

export default router;