import jwt from 'jsonwebtoken';

const createToken = (id: number) => {
  return {
    refresh: jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    }),
    access: jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    }),
  };
};

export { createToken };
