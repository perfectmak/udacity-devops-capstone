import crypto from 'crypto';
import util from 'util';

const jwt = require('jsonwebtoken');

const signAsync = util.promisify(jwt.sign).bind(jwt);
const randomBytesAsync = util.promisify(crypto.randomBytes).bind(crypto);

const generateJwtId = async () => {
  try {
    const jti = await randomBytesAsync(32);
    return Promise.resolve(jti.toString('hex'));
  } catch (e) {
    return Promise.reject(e);
  }
};

export const generateTokens = async (payload, config, opts = {}) => {
  try {
    const accessTokenId = await generateJwtId();
    const refreshTokenId = await generateJwtId();

    const accessTokenPayload = {
      ...payload,
      jti: accessTokenId,
    };
    const refreshTokenPayload = {
      ...payload,
      jti: refreshTokenId,
      ati: accessTokenId,
    };

    const refreshTokenOpts = {
      expiresIn: config.refreshTokenTtl,
      ...opts,
    };

    const accessTokenOpts = {
      expiresIn: config.accessTokenTtl,
      ...opts,
    };

    const refreshToken = await signAsync(
      refreshTokenPayload,
      config.jwtSecret,
      refreshTokenOpts,
    );

    const accessToken = await signAsync(
      accessTokenPayload,
      config.jwtSecret,
      accessTokenOpts,
    );

    return Promise.resolve({
      accessToken,
      refreshToken,
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const parseJWTDataFromRequest = (req, jwtSecret, headerName = 'Authorization') => {
  if (!req || !req.headers) return {};
  const authHeader = req.headers[headerName] || req.headers[headerName.toLowerCase()];

  if (!authHeader) return {};

  try {
    const [authType, token] = authHeader.split(' ');
    let decrypted = {};
    if (authType === 'Bearer') {
      decrypted = jwt.verify(token, jwtSecret);
    }
    return decrypted;
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return {};
    }
    throw Error('JWT token is invalid or has expired.');
  }
};
