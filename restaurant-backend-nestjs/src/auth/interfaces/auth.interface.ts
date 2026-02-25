export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  restaurantId?: number;
  type: 'admin' | 'super_admin';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    access_token: string;
    user: {
      id: number;
      email: string;
      role: string;
      restaurantId?: number;
      type: string;
    };
  };
}
