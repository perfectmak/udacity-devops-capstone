import crypto from 'crypto';
import { promisify } from 'util';

const promisePbkdf2 = promisify(crypto.pbkdf2);

export const generateSalt = () => crypto.randomBytes(32).toString('hex');

export const hash = async (value, salt) => {
  const s = await promisePbkdf2(value, salt, 100000, 64, 'sha512');

  return s.toString('hex');
};

export const verifyHash = async (hashString, value, salt) => {
  const correctHashString = await hash(value, salt);
  return correctHashString === hashString;
};
