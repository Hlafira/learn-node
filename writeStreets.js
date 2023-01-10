import { createLocalLogger } from "./logger/loggers.js";
import { readJSOnFile } from "./files/readJsonFile.js";
import { conMySQL } from "./connections/con_mysql.js";
const logger = createLocalLogger("createStreets");

// try {
//   const promises = streetsReg.map(
//     ({ id, type_ru, type_ukr, name_ru, name_ukr, before }) => {
//       return con.execute(
//         "INSERT INTO streetsregister (id_register, TYPE_ru, type_ukr, name_ru, name_ukr, `before`) VALUES (?, ?, ?,?, ?, ?)",
//         [id, type_ru, type_ukr, name_ru, name_ukr, before]
//       );
//     }
//   );

//   Promise.all(promises)
//     .then((result) => {
//       console.log("Ok");
//       con.close();
//     })
//     .catch((e) => {
//       console.log(e);
//       logger.error(e);
//       con.close();
//     });
// } catch (e) {
//   logger.error(e.message);
// }

async function writeStreets() {
  const con = new conMySQL();
  try {
    const streetsReg = readJSOnFile("D:/test/streets.json");
    // console.log(streetsReg);
    logger.info("Start");
    const streetFromBase = await con.select("select * from streetsregister");
    const streetsOld = await con.select("select * from street");
    const streetsType = await con.select("select * from typeregister");
    logger.info(streetsType);
    for (const street of streetsReg) {
      if (
        !streetFromBase.find(
          (streetBase) => street.id === streetBase.id_register
        )
      ) {
        logger.info(street);
        const { id, type_ru, type_ukr, name_ru, name_ukr, before } = street;
        console.log(id, type_ru, type_ukr, name_ru, name_ukr, before);
        const res = await con.execute(
          "INSERT INTO streetsregister (id_register, TYPE_ru, type_ukr, name_ru, name_ukr, `before`) VALUES (?, ?, ?,?, ?, ?)",
          [id, type_ru, type_ukr, name_ru, name_ukr, before]
        );
      }
      const st_type = streetsType.find(
        (streetType) => streetType.type_ru === street.type_ru
      );
      if (st_type) {
        const res = await con.execute(
          "update  streetsregister set id_typeregister = ? where id_register = ?",
          [st_type.id, street.id]
        );
        logger.info(res);
      }
    }
  } catch (e) {
    logger.error(e);
  } finally {
    con.close();
  }
}

const compareStreets = async () => {
  let count = 0;
  const con = new conMySQL();
  try {
    const oldStreets = await con.select(
      " SELECT  s.id, s.street_name, t.id AS id_type, t.type_name FROM street s JOIN  type_town_street t ON t.id = s.fk_type"
    );
    console.log(oldStreets.filter((street, index) => index < 10));

    const streets = await con.select(
      "SELECT ss.id_register, ss.name_ru, ss.name_ukr, ss.type_ru, ss.type_ukr, ss.`before`, ss.id_typeregister, tr.id_type_town_street FROM streetsregister ss join typeregister tr ON tr.id  = ss.id_typeregister"
    );
    logger.info(streets.filter((street, index) => index < 10));
    for (const street of streets) {
      const oldStreet = oldStreets.find(
        (oldStreet) =>
          oldStreet.street_name == street.name_ru &&
          oldStreet.id_type === street.id_type_town_street
      );
      if (oldStreet) {
        console.log("oldStreet", oldStreet);
        const res = await con.execute(
          "update  streetsregister set id_street = ? where id_register =  ? ",
          [oldStreet.id, street.id_register]
        );
        console.log(res);
        logger.info(oldStreet);
        count += 1;
      }
    }
  } catch (e) {
    logger.error(e);
  } finally {
    con.close();
  }
};
//writeStreets();
logger.info("Start");
compareStreets();
