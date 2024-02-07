import { createPool } from "mysql2/promise";
import config from "../config.js";
import dotenv from "dotenv"

dotenv.config();

const connection = createPool({
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database,
});

export const getConnection =  () =>  connection; 

