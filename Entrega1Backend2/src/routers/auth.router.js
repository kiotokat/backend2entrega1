import { Router } from "express";
import passport from "passport";
import { createToken } from "../utils/token.util.js";

const router = Router();

router.post("/register", passport.authenticate("register", { session: false }), (req, res) => {
  res.json201({ user: req.user }, "User registered successfully");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.json401(info.message);
    const token = createToken({ id: user._id, email: user.email, role: user.role });
    res.cookie("jwt", token, { httpOnly: true, secure: process.env.MODE !== "dev" });
    res.json200({ user, token }, "Login successful");
  })(req, res, next);
});

router.post("/signout", passport.authenticate("current", { session: false }), (req, res) => {
  res.clearCookie("jwt");
  res.json200(null, "User signed out successfully");
});

export default router;
