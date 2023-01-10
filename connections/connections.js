import { Con_MSSQL } from "./con_mssql.js";
import { conMySQL } from "./con_mysql.js";
import { createLocalLogger } from "../logger/loggers.js";
const logger = createLocalLogger("connections");

export const con_mysql = new conMySQL();
export const con_mssql = new Con_MSSQL();
