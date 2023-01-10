import sql from "mssql";
import config from "config";

export function conMssQL() {
  const dbConf = config.get("dbConf").msSQL;
  console.log(dbConf);
  sql.connect(dbConf).then((con) => {
    const request = new sql.Request();
    request.query("select * from s_regions", (err, recordSet) => {
      if (err) console.log(err);
      console.log(recordSet);
    });
  });
}

export class Con_MSSQL {
  constructor() {
    this.dbConf = config.get("dbConf").msSQL;
    this.pool = null;
  }
  async connect() {
    try {
      this.pool = await sql.connect(this.dbConf);
      return true;
    } catch (err) {
      throw err;
      this.pool = null;
      return false;
    }
  }
  async select(selSQL) {
    let isConnect = this.pool;
    console.log("is connect ", isConnect);
    if (!isConnect) {
      isConnect = await this.connect();
    }
    if (isConnect) {
      return this.pool.request().query(selSQL);
    }
  }

  async executeProcedure(procedure_name, input_parameters, output_parameters) {
    return this.pool
      .request()
      .input("input_parameter", sql.Int, value)
      .output("output_parameter", sql.VarChar(50))
      .execute("procedure_name");
  }

  async close() {
    if (this.pool) {
      this.pool.close();
    }
  }
}
