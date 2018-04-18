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
require("./models/Venue");
require("./services/passport");

const app = express();

// === Mongoose connect to MLab === //
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// === Express Middleware === //

// Parse HTTP JSON bodies
app.use(bodyParser.json());
// Parse URLEncoded params
app.use(bodyParser.urlencoded({ extended: true }));
// Cookie Session Config
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);
// Passport
app.use(passport.initialize());
app.use(passport.session());

// === Routes === //
require("./routes/searchRoutes")(app);
require("./routes/authRoutes")(app);

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
