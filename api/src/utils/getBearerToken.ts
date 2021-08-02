import { Request } from 'express';

const getBearerToken = (req: Request) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (token) {
    return token;
  } else {
    throw new createHttpError.Unauthorized('No Token');
  }
};

export default getBearerToken;
