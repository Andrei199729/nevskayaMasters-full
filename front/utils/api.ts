import axios, {AxiosInstance} from 'axios';
import {IDrawing} from '../shared/types';

interface IApi {
  address: string;
  token: string;
}
class Api {
  private client: AxiosInstance;
  constructor({address, token}: IApi) {
    this.client = axios.create({
      baseURL: address,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async getInitialApartaments() {
    const res = await this.client.get('/apartaments');
    return res.data.apartament;
  }

  async getInitialProducts(apartamentId: any) {
    const res = await this.client.get(`/apartaments/${apartamentId}/products`);

    return res.data;
  }

  async getAboutUser() {
    const res = await this.client.get('/users/me');

    return res.data;
  }

  async addProduct(
    nameRoom: string,
    dataProduct: IDrawing[],
    apartamentId: string | null,
  ) {
    try {
      const response = await this.client.post(
        `/apartaments/${apartamentId}/products`,
        {
          nameRoom,
          dataProduct,
        },
      );

      return response.data;
    } catch (err: any) {
      console.error(
        'Ошибка при создании продукта:',
        err.response?.data || err.message,
      );
      throw err;
    }
  }

  async addApplication() {
    try {
      const response = await this.client.post('/apartaments');
      return response.data;
    } catch (err: any) {
      console.error(
        'Ошибка при создании помещения:',
        err.response?.data || err.message,
      );
      throw err;
    }
  }

  async addApartament(apartamentId: string | null, dataApplication: any) {
    if (!apartamentId) {
      console.error('addApartament: apartamentId не найден');
      throw new Error('Id квартиры не найден');
    }
    try {
      const response = await this.client.patch(`/apartaments/${apartamentId}`, {
        apartamentId,
        dataApplication,
      });
      return response.data;
    } catch (err: any) {
      console.error(
        'Ошибка при создании заявки:',
        err.response?.data || err.message,
      );
      throw err;
    }
  }

  async editRoom(dataProduct: IDrawing[], dataId: string, apartamentId: any) {
    try {
      const response = await this.client.patch(
        `/apartaments/${apartamentId}/products/${dataId}`,
        {
          dataProduct,
        },
      );
      return response.data;
    } catch (err: any) {
      console.error(
        'Ошибка при редактировании продукта:',
        err.response?.data || err.message,
      );
      throw err;
    }
  }

  async deleteApplication(apartamentId: string | null) {
    if (!apartamentId) {
      console.warn('apartamentId не передан');
      return;
    }
    try {
      const response = await this.client.delete(`/apartaments/${apartamentId}`);
      return response.data;
    } catch (err: any) {
      console.error(
        'Ошибка при удалении заявки:',
        err.response?.data || err.message,
      );
      throw err;
    }
  }

  async setToken(token: string) {
    this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

const api = new Api({
  // address: 'http://10.207.190.140:3000',
  address: 'http://10.0.2.2:3000', //основной
  // address: 'https://zamerprog.ru/api/back',
  token: '',
});

export default api;
