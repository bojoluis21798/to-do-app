import dotenv from 'dotenv';

dotenv.config();

const Config = {
  JWT_SECRET: process.env.JWT_SECRET || '',
};

export default Config;
