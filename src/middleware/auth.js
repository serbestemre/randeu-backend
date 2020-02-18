const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const User = require("../models/User");

const response = require("../helpers/response");
const AuthError = require("../errors/AuthError");

// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_SECRET_KEY
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // TODO return an error
        if (!user) return done(null, false);

        done(null, user);
      } catch (error) {
        // TODO return an Internal Server Error
        done(error, false);
      }
    }
  )
);

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
        const foundFacebookUser = await User.findOne({ "facebook.id": id });

        // TODO return a proper response as json error or redirect the page
        if (foundFacebookUser) done(AuthError.userAlreadyExists(), null);
        const newUser = new User({
          method: "facebook",
          facebook: {
            id: profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName
          }
        });

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
        const user = await User.findOne({ "local.email": email });

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
        const googleExistingUser = await User.findOne({
          "google.id": profile.id
        });

        if (googleExistingUser) {
          console.log("User already exists in our DB");

          return done(AuthError.userAlreadyExists(), null);
        }
        console.log("User doenst exist, we are creating new one");
        // If new account
        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            name: profile.name.givenName,
            surname: profile.name.familyName
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
