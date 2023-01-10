import fetch from "node-fetch";
const URL = "https://pixabay.com/api/";
const KEY = "31214136-385c270b0ee6f522fe0942e9a";

const get = async () => {
  try {
    const params = new URLSearchParams({
      key: KEY,

      image_type: "photo",
      orientation: "horizontal",
      pretty: "true",
      lang: "ru",
      safesearch: "true",
      page: 1,
      per_page: 20,
    });
    const getUrl = URL + "?" + params.toString();
    console.log("get_url = ", getUrl);
    const res = await fetch(getUrl);
    const headerDate =
      res.headers && res.headers.get("date")
        ? res.headers.get("date")
        : "no response date";
    console.log("Status Code:", res.status);
    console.log("Date in Response header:", headerDate);

    const users = await res.json();

    for (const user of users.hits) {
      //   console.log(`Got user with id: ${user.id}, name: ${user.tags}`);
    }
    return users;
  } catch (err) {
    return [];
    console.log(err.message); //can be console.error
  }
};
async function outerGetter() {
  console.time("Start Get");
  const images = await get();
}

outerGetter();
const throttle = (callback, msCount) => {
  let timer = null;
  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      callback();
      clearTimeout(timer);
      timer = null;
    }, msCount);
    console.log("Clear timer");
  };
};

const throttleGetter = throttle(outerGetter, 10000);

setInterval(throttleGetter, 1000);
