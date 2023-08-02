import express from "express";
import client from "../db.mjs";
import lobbyAdmin from "../middleware/lobby_admin.mjs";

const lobbyRouter = express.Router();
lobbyRouter.use(express.json());

// Create a new message loby
lobbyRouter.post("/", (req, res) => {
  client.connect((err) => {
    if (err) console.log(err);
    client.query(
      "INSERT INTO lobbies (name,fk_user_id) VALUES ($1,$2) RETURNING lobby_id",
      [req.body.name, req.body.user_id],
      (err, result) => {
        if (err) throw err;
        client.query(
          "INSERT INTO lobby_access (fk_lobby_id,fk_user_id) VALUES ($1,$2)",
          [result.rows[0].lobby_id, req.body.user_id],
          (err, result2) => {
            if (err) throw err;
            res.send("step 2 ok");
          }
        );
      }
    );
  });
});

//GET all messages from selected Lobby ID
lobbyRouter.get("/:lobby_id", (req, res) => {
  console.log(req.params.lobby_id);
  client.connect((err) => {
    if (err) console.log(err);
    client.query(
      `SELECT * FROM messages WHERE lobby_id = ${req.params.lobby_id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result.rows);
      }
    );
  });
});

//GET specific message (with ID) from selected Lobby ID
lobbyRouter.get("/:lobby_id/:mess_id", (req, res) => {
  client.connect((err) => {
    if (err) console.log(err);
    client.query(
      `SELECT * FROM messages WHERE mess_id = ${req.params.mess_id} AND lobby_id = ${req.params.lobby_id}`,
      (err, result) => {
        if (err) throw err;
        console.log("Message showing");
        res.status(400).send(result.rows[0]);
      }
    );
  });
});

//POST a message to a specific Lobby ID
lobbyRouter.post("/:lobby_id", lobbyAdmin, (req, res) => {
  client.connect((err) => {
    if (err) console.log(err);
    client.query(
      `INSERT INTO messages (title, body, lobby_id, fk_user_id) VALUES ($1,$2,$3,$4)`,
      [req.body.title, req.body.body, req.params.lobby_id, req.body.user_id],
      (err, result) => {
        if (err) throw err;
        console.log("all good");
        res.status(400).send(result);
      }
    );
  });
});

//Edit a message
lobbyRouter.put("/:mess_id", lobbyAdmin, (req, res) => {
  client.connect((err) => {
    if (err) console.log(err);
    client.query(
      `UPDATE messages SET body = $1 WHERE mess_id = $2`,
      [req.body.body, req.params.mess_id],
      (err, result) => {
        if (err) throw err;
        console.log(`edited message with id ${req.params.mess_id}`);
        res.status(202).send(result);
      }
    );
  });
});

// //ADMIN

// //Add user to a lobby
// lobbyRouter.post("/:lobby_id/add-user", (req, res) => {
//   console.log("route ok");
//   res.send("router ok");
// });

// //Remove user from a lobby
// lobbyRouter.post("/:lobby_id/remove-user", (req, res) => {
//   console.log("route ok");
//   res.send("router ok");
// });

// //TEST
// lobbyRouter.get("/", (req, res) => {
//   console.log("route ok");
//   res.send("router ok");
// });

//

export { lobbyRouter };
