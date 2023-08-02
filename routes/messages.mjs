import express from "express";
import client from "../db.mjs";
import lobbyAdmin from "../middleware/lobby_admin.mjs";

const messRouter = express.Router();

//DELETE a message with a specific ID
messRouter.delete('/:lobby_id/:mess_id', lobbyAdmin, (req, res) => {
  client.connect((err) => {
    if (err) console.log(err);
    client.query(
      `DELETE FROM messages WHERE mess_id = ${req.params.mess_id} AND lobby_id = ${req.params.lobby_id}`,
      (err, result) => {
        if (err) throw err;
        console.log('DELETED')
        res.status(400).send(result);
      }
    );
  });
});



//TEST
messRouter.get("/", (req, res) => {
  console.log("route ok");
  res.send("router ok");
});

//

export { messRouter };
