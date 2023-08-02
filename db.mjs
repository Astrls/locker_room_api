import express from "express";
import pg from "pg";

const { Client } = pg;

const client = new pg.Pool({
  database: "locker_room",
  host: "localhost",
  port: 5432,
  user: "lr_admin",
  password: "becode",
});

export default client