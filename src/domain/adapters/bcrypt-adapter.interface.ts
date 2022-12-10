export interface BcryptAdapterInterface {
  hash(hash: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
