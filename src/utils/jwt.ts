import env from '../config.env';
import jwt from 'jsonwebtoken';

export const signJwt = (payload: Object = {}) => {
  return jwt.sign(payload, env.JWT_KEY, {
    expiresIn: '12h',
    algorithm: 'HS256',
  });
};

export const refresh = (payload: Object = {}) => {
  return jwt.sign(payload, env.JWT_KEY, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
};

export const decodeJwt = <T>(token: string): T | null => {
  try {
    return jwt.decode(token) as T;
  } catch (error) {
    return null;
  }
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    return jwt.verify(token, env.JWT_KEY) as T;
  } catch (error) {
    return null;
  }
};


// export default {
//   sign: (payload: JwtPayload) => {
//     return jwt.sign(payload, env.JWT_KEY, {
//       algorithm: 'HS256',
//       expiresIn: 60 * 60 * 12,
//     });
//   },
//   verify: (accessToken: string) => {
//     try {
//       const payload = jwt.verify(accessToken, env.JWT_KEY);
//       return payload;
//     } catch (error) {
//       return null;
//     }
//   },
//   refresh: () => {
//     return jwt.sign({}, env.JWT_KEY, {
//       algorithm: 'HS256',
//       expiresIn: 60 * 60 * 24,
//     });
//   },
//   refreshVerify: function (refreshToken: string) {
//     return this.verify(refreshToken);
//   },
// };