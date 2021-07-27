import { Application } from 'express';
import Routes from 'types/Routes';
import AuthRouter from './auth/auth.routes';

const routes: Routes[] = [AuthRouter()];

const mapRoutes = (app: Application) => {
  routes.map((route) => app.use(route.routeBaseUrl, route.router));
};

export default mapRoutes;
