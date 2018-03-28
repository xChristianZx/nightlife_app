const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const app = express();

// // === Mongoose === //
// mongoose.Promise = global.Promise;
// mongoose.connect(keys.mongoURI, { useMongoClient: true });

// === Express Middleware === //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static("views"));
app.use(express.static("public"));
app.set("view engine", "html");

// === Routes === //
app.get("/", (req, res) => {
  console.log(req);
  res.render("index");
});

app.post("/", (req, res) => {
  const location = req.body.location;
  console.log(req.body);
  console.log("location: ", req.body.location);

  // number of businesses to return via "limit"
  const dataSize = 10;

  const YELP_API_ENDPOINT = "https://api.yelp.com/v3/businesses/search?";
  const uriOptions = `term=bars&location=${location}&limit=${dataSize}`;
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
