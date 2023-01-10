import { conMssQL, Con_MSSQL } from "./connections/con_mssql.js";
const con = new Con_MSSQL();

(async function () {
  try {
    const isCon = await con.connect();
    if (isCon) {
      console.log(await con.select("select * from s_regions"));
    }
    if (isCon) {
      console.log(await con.select("select top 10 * from s_streets"));
    }
    await con.close();
  } catch (err) {
    console.log(err);
  }
})();
