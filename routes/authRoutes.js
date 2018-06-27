const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = app => {
  // == Register == //
  app.post("/register", (req, res) => {
    const { firstname, lastname, username, password } = req.body;
    const newUser = new User({ username, firstname, lastname });
    
    // .register is convenience method provided by passport-local-mongoose
    User.register(newUser, password, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }
      passport.authenticate("local")(req, res, () => {
        console.log("here i am", req.user);
        const { username, _id, firstname, lastname } = req.user;
        return res.send({ _id, username, firstname, lastname });
      });
    });
  });

  // == LogIn == //
  app.post("/login", passport.authenticate("local"), (req, res) => {
    console.log(`LOGGED IN - ${req.user.username}`);
    // sending mongo's _id and username
    const { _id, username } = req.user;
    res.send({ _id, username });
  });

  // == LogOut == //
  app.get("/logout", (req, res) => {
    console.log(`LOGGED OUT - ${req.user.username}`);
    const logoutMsg = `${req.user.username} has been successfully logged out.`;
    req.logout();
    res.send({ msg: logoutMsg });
  });
};
