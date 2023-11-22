export interface JwtPayload {
  id: number; // або number, залежно від типу вашого ідентифікатора користувача
  email: string;
  exp: number; // Час дії токену в секундах (необов'язковий)
  // Додаткові клейми, якщо потрібно
}
