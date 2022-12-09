export interface BcryptInterface {
  hash(hashString: string): Promise<string>;
  compare(password: string, hashPassword: string): Promise<boolean>;
}
