import axios, {AxiosInstance} from 'axios';
import {IApartments, IDrawing, INormalizedSize} from '../shared/types';
import store from '../services/store';
import {
  textAddApartment,
  textAddApplication,
  textAddProduct,
  textDeleteApplication,
  textEditRoom,
  textIdApartment,
} from './textErrors';
import {APARTMENTS, ROOMS, USERS, ME} from '../sharedPath/apiPaths';
interface IApi {
  address: string;
}

const handleAxiosError = (err: unknown, message: string) => {
  if (axios.isAxiosError(err)) {
    throw err;
  } else {
    throw new Error(message);
  }
};
class Api {
  private client: AxiosInstance;
  constructor({address}: IApi) {
    this.client = axios.create({
      baseURL: address,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.client.interceptors.request.use(config => {
      const token = store.getState().user.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  async getInitialApartments() {
    const res = await this.client.get(APARTMENTS);
    return res.data.apartment;
  }

  async getInitialProducts(apartmentId: string | null | undefined) {
    if (!apartmentId) {
      throw new Error(textIdApartment);
    }
    const res = await this.client.get(`${APARTMENTS}/${apartmentId}${ROOMS}`);

    return res.data;
  }

  async getAboutUser() {
    const res = await this.client.get(`${USERS}${ME}`);

    return res.data;
  }

  async addProduct(
    nameRoom: string,
    dataProduct: IDrawing[],
    apartmentId: string | null,
  ) {
    if (!apartmentId) {
      throw new Error(textIdApartment);
    }
    try {
      const response = await this.client.post(
        `${APARTMENTS}/${apartmentId}${ROOMS}`,
        {
          nameRoom,
          dataProduct,
        },
      );

      return response.data;
    } catch (error) {
      handleAxiosError(error, textAddProduct);
    }
  }

  async addApplication() {
    try {
      const response = await this.client.post(APARTMENTS);
      return response.data;
    } catch (error) {
      handleAxiosError(error, textAddApplication);
    }
  }

  async addApartment(
    apartmentId: string | null,
    dataApplication: INormalizedSize | null,
  ) {
    if (!apartmentId) {
      console.error(textIdApartment);
      throw new Error(textIdApartment);
    }
    try {
      const response = await this.client.patch(`${APARTMENTS}/${apartmentId}`, {
        apartmentId,
        dataApplication,
      });
      return response.data as IApartments;
    } catch (error) {
      handleAxiosError(error, textAddApartment);
    }
  }

  async editRoom(
    dataProduct: IDrawing[],
    dataId: string,
    apartmentId: string | null | undefined,
  ) {
    if (!apartmentId) {
      console.error(textIdApartment);
      throw new Error(textIdApartment);
    }
    try {
      const response = await this.client.patch(
        `${APARTMENTS}/${apartmentId}${ROOMS}/${dataId}`,
        {
          dataProduct,
        },
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error, textEditRoom);
    }
  }

  async deleteApplication(apartmentId: string | null) {
    if (!apartmentId) {
      console.warn(textIdApartment);
      throw new Error(textIdApartment);
    }
    try {
      const response = await this.client.delete(`${APARTMENTS}/${apartmentId}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error, textDeleteApplication);
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
});

export default api;
