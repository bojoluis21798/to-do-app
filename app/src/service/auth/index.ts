import service from '../config';
import {AuthRequest} from './AuthRequest';

const url = '/auth';

export const register = async (payload: AuthRequest) => {
  try {
    const {data} = await service.post(url + '/register', payload);
    return data;
  } catch (e) {
    throw e;
  }
};
