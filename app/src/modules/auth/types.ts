// Auth response types
export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

// Token payload type
export interface TokenPayload {
  userId: number;
  username: string;
  email: string;
}

// Token pair response
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

// Refresh token database record
export interface RefreshToken {
  id?: number;
  token: string;
  user_id: number;
  expires_at: Date;
  created_at?: Date;
}
