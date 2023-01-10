import { write } from "fs";
import { readFile, writeFile, promises } from "fs";

export function writeObj(fname, data) {
  writeFile(fname, JSON.stringify(data), (err) => {
    console.log(err);
    if (err) throw err;
  });
}
