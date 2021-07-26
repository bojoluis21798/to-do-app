import { Application, Router } from 'express';
import AuthRouter from './auth';

interface IRoute {
  url: string;
  router: Router;
}

const routes: IRoute[] = [AuthRouter];

const mapRoutes = (app: Application) => {
  routes.map((route) => app.use(route.url, route.router));
};

export default mapRoutes;
