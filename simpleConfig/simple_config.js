import config from "config";
console.log(config);
const dbConf = config.get("dbConf").mySQL;
const { host, user, password, database, connectionLimit } = dbConf.mySQL;
console.log(host, user, password, database, connectionLimit);
