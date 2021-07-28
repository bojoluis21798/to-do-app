import { Application } from 'express';
import Routes from 'types/Routes';
import authController from './auth/auth.controller';

const routes: Routes[] = [authController];

const mapRoutes = (app: Application) => {
  routes.map((route) => app.use(route.routeBaseUrl, route.router));
};

export default mapRoutes;
