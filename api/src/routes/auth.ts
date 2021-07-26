import { Request, Response, Router } from 'express';

const router = Router();
const AuthRouter = { url: '/auth', router };

router.get('/', (req: Request, res: Response) => {
  res.send('Auth Route');
});

export default AuthRouter;
