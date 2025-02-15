export interface HashStrategy {
  hash: <T>(data: T) => Promise<string>;
}

export class HashService implements HashStrategy {
  public async hash<T>(data: T): Promise<string> {
    return Promise.resolve(`hash_password_${data}`);
  }
}
