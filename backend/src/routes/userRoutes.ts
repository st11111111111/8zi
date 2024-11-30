import { Router, Request, Response } from 'express';

const router = Router();

// 用户路由
router.get('/user', (req: Request, res: Response) => {
  res.json({ message: 'Get user successfully' });
});

export default router;
