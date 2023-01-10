import { createLocalLogger } from "../logger/loggers.js";
const logger = createLocalLogger("readFile");
import fr from "fs";

export function readJSOnFile(filename) {
  try {
    const rawStreets = fr.readFileSync(filename); //"D:/test/streets.json");
    const streets = JSON.parse(rawStreets);

    return streets;
  } catch (e) {
    console.log(e);
    logger.error(e.message);
    return null;
  }
}

// console.log(readJSOnFile("D:/test/streets.json"));
