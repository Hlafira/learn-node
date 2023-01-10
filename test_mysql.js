// import { result } from "lodash";
import { conMySQL } from "./connections/con_mysql.js";

const con = new conMySQL();

// con.getRegions().then((result) => {
//   console.log(result[0]);
//   con.close();
// });

// con.getRegions().then((result) => {
//   console.log(result[0]);
//   con.close();
// });

con
  .select("select * from region", [])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    con.close();
  });
