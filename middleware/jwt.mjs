// Middleware to verify JSON web token presence
import jwt from "jsonwebtoken"

const authToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,payload) => {
      if (err) return res.sendStatus(403);
      res.locals.payload = payload
      next();
    });
  };

  export default authToken