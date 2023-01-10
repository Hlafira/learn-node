import http from "http";
import { readFile, writeFile, promises } from "fs";
import events from "events";

const htserv = http
  .createServer(function (request, response) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, { "Content-Type": "text/plain" });

    // Send the response body as "Hello World"
    response.end("Hello World\n");
  })
  .listen(8081);

// Console will print the message
console.log("Server running at http://127.0.0.1:8081/");

function replaceFileStr() {
  console.log("Start read file");
  readFile("./package-test.json", "utf-8", function (err, contents) {
    if (err) {
      console.log(err);
      return;
    }
    try {
      const set = JSON.parse(contents);
      console.log(set);
    } catch (e) {
      console.log(e);
    }
    const replaced = contents.replace(/Hlafira/g, "Marina");

    writeFile("./package-test.json", replaced, "utf-8", function (err) {
      console.log(err);
    });
  });
}

function readParamsCount() {
  console.log(process.argv);
}

const eventEmitter = new events.EventEmitter();
eventEmitter.addListener("readFile", replaceFileStr);
eventEmitter.on("readFile", readParamsCount);
eventEmitter.emit("readFile");
