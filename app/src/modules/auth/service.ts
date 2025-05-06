import crypto from "crypto";
import db from "../../config/database";
import { generateToken } from "../../middlewares/auth.middleware";
import { User } from "../users/types";
import { TokenPair, TokenPayload } from "./types";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "your-refresh-secret-key";

export class AuthService {
  async register(
    userData: Omit<User, "id" | "created_at" | "updated_at">
  ): Promise<User> {
    // Hash password (in a real app, use bcrypt or similar)
    const hashedPassword = this.hashPassword(userData.password);

    // Create user with hashed password
    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    };

    // Insert user into database
    const [id] = await db("users").insert(userWithHashedPassword);

    // Retrieve created user
    return this.findUserById(id);
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: User; tokens: TokenPair } | null> {
    // Find user by email
    const user = await db("users").where({ email }).first();

    if (!user) {
      return null;
    }

    // Verify password
    const hashedPassword = this.hashPassword(password);
    if (user.password !== hashedPassword) {
      return null;
    }

    // Generate tokens
    const tokens = await this.generateTokenPair(user);

    return { user, tokens };
  }

  async refreshToken(refreshToken: string): Promise<TokenPair | null> {
    try {
      // Verify refresh token
      const tokenRecord = await db("refresh_tokens")
        .where({ token: refreshToken })
        .where("expires_at", ">", new Date())
        .first();

      if (!tokenRecord) {
        return null;
      }

      // Find associated user
      const user = await this.findUserById(tokenRecord.user_id);
      if (!user) {
        return null;
      }

      // Delete used refresh token
      await db("refresh_tokens").where({ id: tokenRecord.id }).delete();

      // Generate new token pair
      return this.generateTokenPair(user);
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  }

  async logout(refreshToken: string): Promise<boolean> {
    try {
      // Delete refresh token from database
      await db("refresh_tokens").where({ token: refreshToken }).delete();
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  }

  private async generateTokenPair(user: User): Promise<TokenPair> {
    // Create token payload
    const payload: TokenPayload = {
      userId: user.id!,
      username: user.username,
      email: user.email,
    };

    // Generate access token
    const accessToken = generateToken(payload);

    // Generate refresh token
    const refreshToken = crypto.randomBytes(40).toString("hex");

    // Store refresh token in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    await db("refresh_tokens").insert({
      token: refreshToken,
      user_id: user.id,
      expires_at: expiresAt,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async findUserById(id: number): Promise<User> {
    return db("users")
      .where({ id })
      .select("id", "username", "email", "password", "created_at", "updated_at")
      .first();
  }

  private hashPassword(password: string): string {
    // In a real app, use bcrypt or better hashing algorithm
    // This is a simple hash for demo purposes only
    return crypto.createHash("sha256").update(password).digest("hex");
  }
}
