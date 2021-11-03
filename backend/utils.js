import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    isTeacher: user.isTeacher,
    isAdmin: user.isAdmin
  }, secretKey, {
    expiresIn: "7d"
  });
  return token;
}

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const secretKey = process.env.SECRET_KEY;
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
      } else {
        req.user = decoded;
        next();
      }
    })
  } else {
    res.status(401).send({ message: "No token" })
  }
}