const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const User = require("../models/User");

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

        // If user doesn't exists, handle it
        if (!user) return done(null, false);

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
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
        console.log("profile", profile);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
      } catch (error) {
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
        // IF not handle it
        if (!user) return done(null, false);

        console.log(password);

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        console.log("isMatch", isMatch);

        // If not handle it.
        if (!isMatch) return done(null, false);

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findOne({
//       _id: decoded._id,
//       'local.tokens.token': token
//     });

//     if (!user) throw new Error();

//     req.token = token;
//     req.user = user;
//     next();
//   } catch (e) {
//     res.status(401).send({ error: 'Please Authenticate' });
//   }
// };

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
        const localExistingUser = await User.findOne({
          "local.email": profile.emails[0].value
        });
        if (googleExistingUser || localExistingUser) {
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
