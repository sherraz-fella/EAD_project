import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
};

export default auth;