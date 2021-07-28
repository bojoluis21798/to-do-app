import { Router } from 'express';

interface Route {
  routeBaseUrl: string;
  router: Router;
}

export type RouteProvider = () => Route;

export default Route;
