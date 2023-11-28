export interface JwtPayload {
  id: number; // або number, залежно від типу вашого ідентифікатора користувача
  email: string;
  exp: number;
  role: string;
}
