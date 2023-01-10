import fetch from "node-fetch";
/**
 *
 * @param {string} url
 * @param {object} search params
 * @returns {Array} array of objects
 */
export const getLocal = async (url, params) => {
  try {
    const urlParams = new URLSearchParams(params);
    console.log(params, urlParams.toString());
    const getUrl = url + "?" + urlParams.toString();
    console.log(getUrl);
    const res = await fetch(getUrl);
    const headerDate =
      res.headers && res.headers.get("date")
        ? res.headers.get("date")
        : "no response date";
    console.log("Status Code:", res.status);
    console.log("Date in Response header:", headerDate);
    try {
      const users = await res.json();

      return users;
    } catch {
      console.log("res body = ", res.body.length);
      return [];
    }
  } catch (err) {
    //can be console.error
    throw err;
  }
  return [];
};
