import { Router } from 'express';
import Controller from 'types/Controller';

const parseRoutes = (routeBaseUrl: string, controller: Controller) => {
  const router = Router();

  controller.forEach((c) => {
    router[c.method](c.pathName, [...c.middlewares, c.handler]);
  });

  return { routeBaseUrl, router };
};

export default parseRoutes;
