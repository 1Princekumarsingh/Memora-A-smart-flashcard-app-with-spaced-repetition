import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
export const REFRESH_SECRET = process.env.REFRESH_SECRET || 'super-refresh-secret';
export const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || '7d';

export const env = {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  REFRESH_SECRET,
  REFRESH_EXPIRES_IN,
};

export default {
  ...env,
};
