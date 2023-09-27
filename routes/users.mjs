import express from "express";
import client from "../db.mjs";
import authToken from "../middleware/jwt.mjs";

const userRouter = express.Router();

const dbConnect = async (queries) => {
  client.connect((err) => {
    if (err) throw err;
    queries;
  });
};

userRouter.get("/", authToken, async (req, response) => {
  await dbConnect(
    client.query('SELECT * FROM "users"', (err, res) => {
      if (err) throw err;
      response.send({ response: res });
    })
  )
});

// //GET a list of all users
// userRouter.get("/", authToken, async (req, response) => {
//   client.connect((err) => {
//     if (err) console.log(err);
//     client.query('SELECT * FROM "users"', (err, res) => {
//       if (err) throw err;
//       response.send({ response: res });
//     });
//   });
// });

//GET data on a specific user
userRouter.get("/:user_id", (req, response) => {
  console.log("route ok");
  res.send("router ok");
});

userRouter.get("/", (req, res) => {
  console.log("route ok");
  res.send("router ok");
});

export { userRouter };
