const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return done(null, false, req.flash("signinMessage", "No User Found"));
      }
      if (!user.comparePassword(password)) {
        return done(
          null,
          false,
          req.flash("signinMessage", "Incorrect Password")
        );
      }
      return done(null, user);
    }
  )
);
