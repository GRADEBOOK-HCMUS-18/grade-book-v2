import axios from 'axios';
import { HttpError } from 'shared/error';
import { TOKEN_KEY } from 'shared/constants';
import { storageService } from './storage-service';
import { cryptoService } from './crypto-service';

const baseUrl = 'http://localhost:5000';
class HttpService {
  async sendGet(url: string, token: string) {
    try {
      const response = await axios.get(`${baseUrl}${url}`, {
        headers: this.getHeader(token),
      });

      return response.data;
    } catch (error: any) {
      return new HttpError(error.response);
    }
  }

  async sendPost(url: string, body: any, token?: string) {
    try {
      const response = await axios.post(
        `${baseUrl}${url}`,
        JSON.stringify(body),
        {
          headers: this.getHeader(token),
        }
      );
      return response.data;
    } catch (error: any) {
      return new HttpError(error.response);
    }
  }

  async sendPut(url: string, body: any, token?: string) {
    try {
      const response = await axios.put(
        `${baseUrl}${url}`,
        JSON.stringify(body),
        {
          headers: this.getHeader(token),
        }
      );
      return response.data;
    } catch (error: any) {
      return new HttpError(error.response);
    }
  }

  async sendDelete(url: string, token?: string) {
    try {
      const response = await axios.delete(`${baseUrl}${url}`, {
        headers: this.getHeader(token),
      });

      return response.data;
    } catch (error: any) {
      return new HttpError(error.response);
    }
  }

  getBearerToken() {
    const token = storageService.getSessionStorage(TOKEN_KEY);
    const decryptToken = cryptoService.decrypt(token || '');
    return `Bearer ${decryptToken}`;
  }

  getHeader(token: string | undefined) {
    const headers: any = token
      ? {
          Authorization: token,
          'Content-Type': 'application/json',
        }
      : {
          'Content-Type': 'application/json',
        };
    return headers;
  }
}

export const httpService = new HttpService();
