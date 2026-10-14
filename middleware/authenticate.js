import { verityToken } from "../utils/jwt.js";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const [scheme, token] = authHeader?.split(" ") || [];

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      error: "No token provided.",
    });
  }

  let decoded;

  try {
    decoded = verityToken(token);

    if (!decoded) {
      return res.status(401).json({
        error: "Invalid or expired token.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token.",
    });
  }

  req.user = decoded;
  next();
}