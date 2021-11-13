import axios from 'axios';

const baseUrl = 'http://localhost:3000';
class HttpService {
  async sendGet(url: string, token: string) {
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  }

  async sendPost(url: string, body: any, token: string) {
    const response = await axios.post(url, JSON.stringify(body), {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }

  async sendPut(url: string, body: any, token: string) {
    const response = await axios.put(url, JSON.stringify(body), {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }

  async sendDelete(url: string, token: string) {
    const response = await axios.delete(url, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  }
}

export const httpService = new HttpService();
