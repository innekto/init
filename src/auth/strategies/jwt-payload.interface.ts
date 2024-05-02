export interface JwtPayload {
  id: number;
  email: string;
  exp: number;
  role: string;
}
