
import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.send("user is not Autherised");
        } else {
          if (decoded && decoded.user) {
            req.user = decoded.user;
            console.log(decoded.user);
            next();
          } else {
            res.send("Invalid token payload");
          }
        }
      });
    } else {
      res.send("user is not authorized or token is missing");
    }
  } catch (error) {
    next(error);
  }
};

export default validateToken;
