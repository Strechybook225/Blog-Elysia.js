import { LoginInput, RefreshTokenInput, RegisterInput } from "./request.schema";
import { AuthService } from "./service";

export class Controller {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register({ body }: { body: RegisterInput }) {
    try {
      const user = await this.authService.register(body);

      // Generate tokens for auto-login
      const { tokens } =
        (await this.authService.login(body.email, body.password)) || {};

      if (!tokens) {
        throw new Error("Failed to generate auth tokens");
      }

      // Return success with user info and tokens
      return {
        success: true,
        message: "User registered successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error: any) {
      // Handle duplicate user error
      if (error.message?.includes("UNIQUE constraint failed")) {
        return {
          success: false,
          message: "Email or username already exists",
        };
      }

      throw error;
    }
  }

  async login({ body }: { body: LoginInput }) {
    const result = await this.authService.login(body.email, body.password);

    if (!result) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const { user, tokens } = result;

    return {
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshToken({ body }: { body: RefreshTokenInput }) {
    const tokens = await this.authService.refreshToken(body.refreshToken);

    if (!tokens) {
      return {
        success: false,
        message: "Invalid or expired refresh token",
      };
    }

    return {
      success: true,
      message: "Token refreshed successfully",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout({ body }: { body: RefreshTokenInput }) {
    const success = await this.authService.logout(body.refreshToken);

    return {
      success,
      message: success ? "Logged out successfully" : "Logout failed",
    };
  }
}
