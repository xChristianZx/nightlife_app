const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("BUY MY NIGHTLIFE APP");
});

app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
