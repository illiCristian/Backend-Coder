import jwt from "jsonwebtoken";

const PRIVATE_KEY = "my-secret-key";

export const generateToken = (user, expires) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      user,
      PRIVATE_KEY,
      { expiresIn: expires || "1d" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
export function authRequired(req, res, next) {
  const { token } = req.cookies;
  console.log(token + "tken cookie autrequired");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  //Validamos que el token que se intenta usar sea un token generado con jwt
  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
}
