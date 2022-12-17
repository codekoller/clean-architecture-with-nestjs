export interface JwtSecretInterface {
  getJwtSecret(): string;
  getExpiresIn(): string;
}
