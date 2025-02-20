import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.model.js";
import { createHash, compareHash } from "../utils/hash.util.js";

passport.use(
  "register",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        let user = await User.findOne({ email });
        if (user) return done(null, false, { message: "Email already exists" });
        user = new User({ ...req.body, password: createHash(password) });
        await user.save();
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !compareHash(password, user.password)) {
          return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "current/jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies?.token || null
      ]),
      secretOrKey: process.env.JWT_KEY,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
