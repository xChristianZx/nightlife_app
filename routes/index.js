const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = app => {
  // Will be react-router handled
  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.post("/register", (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username });
    User.register(newUser, password, (err, user) => {
      if (err) {
        throw err;
        return res.redirect("register");
      }
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    });
    res.redirect("/");
  });

  // == LogIn == //
  app.get("/login", (req, res) => {
    res.render("login");
  });

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
