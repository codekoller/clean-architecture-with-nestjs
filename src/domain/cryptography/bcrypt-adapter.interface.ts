export interface BcryptAdapterInterface {
  hash(plaintext: string): Promise<string>;
  compare(plaintext: string, digest: string): Promise<boolean>;
}
