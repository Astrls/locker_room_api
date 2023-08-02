import client from "../db.mjs";

const lobbyAdmin = (req, res, next) => {
  const user_id = req.body.user_id;
  const lobby_id = req.body.lobby_id;

  client.connect((err) => {
    if (err) console.log(err);
    client.query(
      `SELECT lobby_admin_id FROM lobbies WHERE lobby_id = ${lobby_id}`,
      (err, result) => {
        if (err) console.log(err);
        if (result.rows[0].lobby_admin_id == user_id) {
          next();
        } else {
            res.status(400).send("you need to be lobby admin")
        }
      }
    );
  });
};

export default lobbyAdmin;
