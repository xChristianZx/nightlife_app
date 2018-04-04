const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
require("./models/User");

const app = express();

// // === Mongoose === //
// mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// === Express Middleware === //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // equals 30days
    keys: [keys.cookieKey]
  })
);

app.use(express.static("public"));
app.set("view engine", "html");

app.use(passport.initialize());
app.use(passport.session());

// === Routes === //
app.get("/", (req, res) => {
  console.log(req);
  res.render("index");
});

app.post("/", (req, res) => {
  const location = req.body.location;
  console.log(req.body);
  console.log("location: ", req.body.location);

  const listSize = 10;

  const YELP_API_ENDPOINT = "https://api.yelp.com/v3/businesses/search?";
  const uriOptions = `term=bars&location=${location}&limit=${listSize}`;
  const reqOptions = {
    auth: {
      bearer: keys.yelpAPIKEY
    }
  };

  request.get(YELP_API_ENDPOINT + uriOptions, reqOptions, (err, resp, body) => {
    // console.log(err);
    // console.log(resp.statusCode);
    // console.log(body);
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
