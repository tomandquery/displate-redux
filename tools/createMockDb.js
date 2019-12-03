/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const { data } = mockData;
const items = JSON.stringify({ data });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, items, function(err) {
  err ? console.log(err) : console.log("Mock DB for displate app has been created.");
});
