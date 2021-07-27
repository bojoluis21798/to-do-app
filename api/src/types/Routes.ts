import { Router } from 'express';

interface Route {
  routeBaseUrl: string;
  router: Router;
}

export type RouteF = () => Route;

export default Route;
