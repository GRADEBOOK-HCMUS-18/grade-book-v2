import axios from 'axios';
import { HttpError } from 'shared/errors';
import { TOKEN_KEY, BASE_URL } from 'shared/constants';
import { storageService } from './storage-service';
import { cryptoService } from './crypto-service';

class HttpService {
  async sendGet(url: string, token?: string) {
    try {
      const response = await axios.get(`${BASE_URL}${url}`, {
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
        `${BASE_URL}${url}`,
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
        `${BASE_URL}${url}`,
        JSON.stringify(body),
        {
          headers: this.getHeader(token),
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return new HttpError(error.response);
    }
  }

  async sendDelete(url: string, token?: string) {
    try {
      const response = await axios.delete(`${BASE_URL}${url}`, {
        headers: this.getHeader(token),
      });

      return response.data;
    } catch (error: any) {
      return new HttpError(error.response);
    }
  }

  getBearerToken() {
    const token = storageService.getLocalStorage(TOKEN_KEY);
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

  async sendFile(
    url: string,
    method: 'POST' | 'PUT',
    formData: any,
    token?: string
  ) {
    try {
      const response = await axios({
        url: `${BASE_URL}${url}`,
        method: method,
        data: formData,
        headers: token ? { Authorization: token } : {},
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
      return new HttpError(error.response);
    }
  }
}

export const httpService = new HttpService();
