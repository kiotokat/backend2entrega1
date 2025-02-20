import passport from "passport";

export const isAuthenticated = (req, res, next) => {
  passport.authenticate("current", { session: false }, (err, user, info) => {
    if (err) return res.json500(err.message);
    if (!user) return res.json401("Unauthorized: Invalid or missing token");
    req.user = user;
    next();
  })(req, res, next);
};
