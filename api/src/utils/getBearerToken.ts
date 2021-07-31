import { Request } from 'express';

const getBearerToken = (req: Request) => {
  return req.header('Authorization')?.replace('Bearer ', '');
};

export default getBearerToken;
