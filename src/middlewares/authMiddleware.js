import { verifyToken } from '../config/auth.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido.' });

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido.' });
  }
}