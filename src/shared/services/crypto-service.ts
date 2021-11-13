import { AES, enc } from 'crypto-js';

const HASH_KEY: any = process.env.REACT_APP_HASH_KEY;

class CryptoService {
  encrypt(data: string) {
    const encrypted = AES.encrypt(data, HASH_KEY).toString();
    return encrypted;
  }

  decrypt(hashed: string) {
    const decrypted = AES.decrypt(hashed, HASH_KEY);
    return decrypted.toString(enc.Utf8);
  }
}

export const cryptoService = new CryptoService();
