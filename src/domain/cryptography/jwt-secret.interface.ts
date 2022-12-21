export interface JwtSecretInterface {
  getJwtSecret(): string;
  getJwtRefreshToken(): string;
  getExpiresIn(): string;
}
