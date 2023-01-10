import { createLocalLogger } from "./logger/loggers.js";
import { con_mysql, con_mssql } from "./connections/connections.js";
import { Region, Regions } from "./model/regions.js";

import { conMySQL } from "./connections/con_mysql.js";
const logger = createLocalLogger("getRegions");
async function getRegions() {
  const regions = new Regions();
  try {
    try {
      let recordsMSSQLRegions = null;

      //   con_mssql.select("select * from s_regions").then((err, result) => {});
      const regionsRecord = await con_mssql.select("select * from s_regions");
      recordsMSSQLRegions = regionsRecord.recordset;
      console.log(recordsMSSQLRegions);
      //   console.log(regionsRecord.recordset[0]);

      const mysql_reg = await con_mysql.select("select * from region", []);
      //   .then((result) => {
      //     console.log(result);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
      //   .finally(() => {
      //     con_mysql.close();
      //   });
      // const regionsMySQL = await con_mysql.select("select * from regions");
      // console.log(regionsMySQL);
      console.log(mysql_reg);

      console.log(recordsMSSQLRegions);
      recordsMSSQLRegions.forEach(({ ID, NAME, nameUKR }) => {
        console.log(ID, NAME, nameUKR);
        let id_mysql = mysql_reg.find((el) => el.name === NAME);
        id_mysql = id_mysql ? id_mysql.id : (id_mysql = -1);
        console.log(id_mysql);
        const region = new Region(ID, id_mysql, 0, NAME, nameUKR);
        console.log(region);
        regions.addRegion(region);
      });
      return regions;
    } catch (e) {
      logger.error("getRegions", e);
      console.log(e);
      throw e;
    } finally {
      con_mysql.close();
      //   isConMsSQL.close();
    }
  } catch (e) {
    logger.error("getRegions", e);
    throw e;
  }
}
(async () => {
  const regions = await getRegions();
  console.log("regions :", regions);
})();
