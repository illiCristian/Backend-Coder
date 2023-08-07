export const publicAcces = (req, res, next) => {
  if (!req.session.user) return res.redirect("/");
  next();
};
export const isAuth = (req, res, next) => {
  console.log(req.session.user);
  if (req.session.user) res.redirect("/");
  next();
};
export const privateAcces = (req, res, next) => {
  if (!req.session.user)
    return res.status(401).json({ message: "Unauthorized" });
  next();
};

export const adminAcces = (req, res, next) => {
  if (req.session.user.role !== "admin") {
    console.log("solo se admiten admins");
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
export const rolPremiumAdminAcces = (req, res, next) => {
  if (
    req.session.user.role !== "admin" &&
    req.session.user.role !== "premium"
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
