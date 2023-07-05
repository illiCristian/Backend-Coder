export const publicAcces = (req, res, next) => {
  if (req.session.user) return res.redirect("/");
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
