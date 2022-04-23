const jwt = require("jsonwebtoken");



const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

// const authenticateWithClaims = (claims) => (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.sendStatus(401);
//   }

//   const token = authHeader.split(" ")[1];

//   jwt.verify(token, accessTokenSecret, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     for (let claim of claims) {
//       if (user.claims.includes(claim)) {
//         req.user = user;
//         return next();
//       }
//     }
//     return res.sendStatus(403);
//   });
// }

module.exports = { authenticateJWT };