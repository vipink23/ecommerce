import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          // res.send("user is not Autherised",err);
          console.log("error", err);
        } else {
          if (decoded && decoded.user ) {
            req.user = decoded.user;
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


const jwtAdmin = async (req, res, next) => {
  try {
    const token = req.headers["a-access-token"];
    if (!token) {
      res.send({ status: "failed", message: "You need token" });
    } else {
      jwt.verify(token, process.env.ACCESS_ADMIN_SECRET_TOKEN, (err, decoded) => {
        if (err) {
          res.json({
            auth: false,
            status: "failed",
            message: "failed to authenticate",
          });
        } else {
          req.admin = decoded.admin;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};


export default validateToken;
