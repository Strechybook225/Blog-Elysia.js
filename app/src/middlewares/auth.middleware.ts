import { Elysia } from "elysia";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface JwtPayload {
  userId: number;
  username: string;
  iat?: number;
  exp?: number;
}

export const authMiddleware = new Elysia().derive(
  { as: "global" },
  (context) => {
    const authorization = context.request.headers.get("authorization");

    if (!authorization) {
      return {
        user: null,
        isAuthenticated: false,
      };
    }

    try {
      const token = authorization.replace("Bearer ", "");
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      return {
        user: decoded,
        isAuthenticated: true,
      };
    } catch (error) {
      return {
        user: null,
        isAuthenticated: false,
      };
    }
  }
);

export const requireAuth = new Elysia().use(authMiddleware).guard({
  beforeHandle: ({ isAuthenticated, set }) => {
    if (!isAuthenticated) {
      set.status = 401;
      return {
        success: false,
        message: "Unauthorized: Authentication required",
      };
    }
  },
});

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};
