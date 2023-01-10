import https from "https";

https
  .get(
    "https://pixabay.com/api/?key=31214136-385c270b0ee6f522fe0942e9a&&pretty=true&page=1&per_page=50",
    (res) => {
      let data = [];
      const headerDate =
        res.headers && res.headers.date ? res.headers.date : "no response date";
      console.log("Status Code:", res.statusCode);
      console.log("Date in Response header:", headerDate);
      let i = 0;
      res.on("data", (chunk) => {
        data.push(chunk);
        i++;
        console.log("push :", i);
      });
      res.on("end", () => {
        console.log("Response ended: ");
        const users = JSON.parse(Buffer.concat(data).toString());

        for (const user of users.hits) {
          console.log(`Got user with id: ${user.id}, tags: ${user.tags}`);
        }
      });
    }
  )
  .on("error", (err) => {
    console.log("Error: ", err.message);
  });
