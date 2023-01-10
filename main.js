import throttle from "lodash.throttle";
import { createLocalLogger } from "./logger/loggers.js";
import { getLocal } from "./http/getData.js";
import { writeObj } from "./writeFile.js";

const logger = createLocalLogger("main");
const URL =
  "https://1562.kharkivrada.gov.ua/api/v1/appeal_KharkivKADS/get/json/";

const dt = new Date();
dt.setDate(dt.getDate() - 1);
const strDt = dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate();
const params = {
  EDRPOU: 37182507,
  dateBegin: strDt,
  OnlyNew: 0,
};

async function getChangedWorks() {
  try {
    console.time("Change works");
    writeObj("mm.log", params);
    const inputWorks = await getLocal(URL, params);

    writeObj("inputWorks.json", inputWorks);
  } catch (e) {
    logger.error("getChangeLogger", e);
    console.log("error", e);
  }
}

async function executer1() {
  let timer1 = setInterval(
    throttle(async () => {
      await getChangedWorks();
    }),
    12000
  );
}
console.log(throttle);
writeObj("mm.log", params);
// getChangedWorks();

executer1();
