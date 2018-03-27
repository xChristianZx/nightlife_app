const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const app = express();

// // === Mongoose === //
// mongoose.Promise = global.Promise;
// mongoose.connect(keys.mongoURI, { useMongoClient: true });

// === Express Middleware === //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("views"));
app.set("view engine", "html");

// === Routes === //
app.get("/", (req, res) => {
  console.log(req);
  res.render("index");
});

app.post("/", (req, res) => {
  console.log(req.body);
  const location = req.body.location;

  const YELP_API_ENDPOINT = "https://api.yelp.com/v3/businesses/search?";
  const uriOptions = `term=bars&location=${location}&limit=1`;
  const reqOptions = {
    auth: {
      bearer: keys.yelpAPIKEY
    }
  };

  request.get(YELP_API_ENDPOINT + uriOptions, reqOptions, (err, resp, body) => {
    console.log(err);
    console.log(resp.statusCode);
    console.log(body);
    res.send(body);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
