import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';

const AuthService = {
  createGuest: () => {
    const userID = nanoid();
    const token = jwt.sign(userID, 'jwt-secret');

    return {
      userID,
      token,
    };
  },
};

export default AuthService;
