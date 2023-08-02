import client from "../db.mjs";

//
const uniqueChecker = (req, res, next) => {
  const email = req.body.email;
  client.connect((err) => {
    if (err) console.log(err);
    client.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      (err, result) => {
        if (err) res.send(err);
        if (result.rowCount === 1)
          res.status(403).send("This email address is already used");
        if (result.rowCount === 0) next();
      }
    );
  });
};



export default uniqueChecker;
