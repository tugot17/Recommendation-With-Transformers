const express = require("express");
const cors = require("cors");
const Papa = require("papaparse");
const fs = require("fs");
var app = express();

var content = fs.readFileSync("src/app_id_info.csv", "utf8");

var rows;
Papa.parse(content, {
  header: true,
  skipEmptyLines: true,
  complete: function (results) {
    //console.log("Finished:", results.data);
    rows = results.data;
  },
});
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

app.use(cors());
app.listen(3001, () => {
  console.log("Server running on port 3000");
});
app.post("/", (req, res, next) => {
  console.log(req);
  setTimeout(() => {
    res.json(getRandom(rows, getRandomInt(6, 15)).map((el) => el.appid));
  }, 2000);
});
