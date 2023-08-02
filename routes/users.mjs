import express from 'express'
import client from '../db.mjs'

const userRouter = express.Router();

//GET a list of all users
userRouter.get("/", (req, response) => {
  client.connect((err) => {
    if (err) console.log(err);
    client.query('SELECT * FROM "users"', (err, res) => {
      if (err) throw err;
      response.send({ response: res });
    });
  });
});

//GET data on a specific user
userRouter.get("/:user_id", (req, response) => {
  console.log('route ok')
  res.send("router ok")
});


  userRouter.get("/", (req, res) => {
    console.log('route ok')
    res.send("router ok")

  })

  export { userRouter }
