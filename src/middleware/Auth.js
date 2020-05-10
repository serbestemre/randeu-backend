const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const User = require("../models/User");
const AuthError = require("../errors/AuthError");

passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: process.env.appID,
      clientSecret: process.env.appSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id } = profile;
        const foundFacebookUser = await User.findOne({ id });

        // TODO return a proper response as json error or redirect the page
        if (foundFacebookUser) done(AuthError.UserAlreadyExists(), null);
        const newUser = new User({
          method: "facebook",
          id: profile.id,
          email: profile.emails[0].value,
          fullName: profile.displayName
        });
        Object.assign(newUser, { roles: [1] });
        await newUser.save();

        done(null, newUser);
      } catch (error) {
        // response üzerinden JSON hata döndür
        done(error, false, error.message);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ email });

        // TODO return an error rather than null
        if (!user) return done(null, false);

        console.log(password);

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        console.log("isMatch", isMatch);

        // TODO return an error rather than null
        if (!isMatch) return done(null, false);

        done(null, user);
      } catch (error) {
        // TODO return the Internal server error
        done(error, false);
      }
    }
  )
);

passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check whether this current user exists in our DB
        const existingUser = await User.findOne({
          id: profile.id
        });

        // Return existing user's token if the user already exists
        if (existingUser)
          return done(null, existingUser);

        // Create new account for the user
        const newUser = new User({
          method: "google",
          id: profile.id,
          email: profile.emails[0].value,
          fullName: `${profile.name.givenName} ${profile.name.familyName}`
        });
        Object.assign(newUser, { roles: [1] });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
