export interface AuthResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}
