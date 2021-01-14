import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const getAccessToRoute = asyncHandler(async (req, res, next) => {
  if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer '))) {
    res.status(401);
    throw new Error('You are not authorized to access this route.');
  }

  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401);
      return next(new Error('You are not authorized to access this route.'));
    }

    req.user = decoded.id;
    next();
  });
});

export { getAccessToRoute };
