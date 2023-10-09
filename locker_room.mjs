// Import modules
import express from "express";
import client from "./db.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authToken from "./middleware/jwt.mjs";

//Import middleware
import uniqueChecker from "./middleware/unique_db_checker.mjs";

//Import routes
import { userRouter } from "./routes/users.mjs";
import { lobbyRouter } from "./routes/lobby.mjs";
import { messRouter } from "./routes/messages.mjs";

// Setup
const app = express();
const PORT = 8050;
dotenv.config();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/lobby", lobbyRouter);
app.use("/api/messages", messRouter);

//REGISTER
app.post("/api/register", uniqueChecker, async (req, res) => {
  try {
    const hashedPw = await bcrypt.hash(req.body.password, 10);
    const user = { email: req.body.email, password: hashedPw };
    client.connect((err) => {
      if (err) console.log(err);
      client.query(
        `INSERT INTO users (email, password) VALUES ($1,$2)`,
        [user.email, user.password],
        (err, result) => {
          if (err) throw err;
          res.status(201).send(result);
        }
      );
    });
  } catch {
    res.status(500);
    res.send("can't create user");
  }
});

//LOGIN
app.post("/api/login", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  client.connect((err) => {
    if (err) console.log(err);
    client.query(
      `SELECT password, user_id FROM users WHERE email = $1`,
      [user.email],
      async (err, result) => {
        if (err) throw err;
        try {
          if (await bcrypt.compare(user.password, result.rows[0].password)) {
            // res.send("you're logged in :)");
            const user_id = { user_id: result.rows[0].user_id };
            const accessToken = jwt.sign(
              user_id,
              process.env.ACCESS_TOKEN_SECRET
            );
            res
              .cookie("accesToken", accessToken, {
                httpOnly: true,
                sameSite: "strict",
              })
              .json({ token: accessToken });
          } else {
            res.status(403).send("Wrong credentials");
          }
        } catch {
          res.status(500);
        }
      }
    );
  });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
