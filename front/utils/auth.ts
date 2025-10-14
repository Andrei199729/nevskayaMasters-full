import axios from 'axios';
import {TOKEN_PATH} from './constants';
import {getKeychain, setKeychain} from './keychain';
const BASE_URL = 'http://10.0.2.2:3000';
// export const BASE_URL = 'http://10.207.190.140:3000';

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const getJson = (res: Response) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};
const postRefreshToken = async (refreshToken?: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${TOKEN_PATH}`,
      {
        refreshToken,
      },
      {headers: HEADERS},
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка refresh token:', error);
    throw error;
  }
};

export const fetchWithRefresh = async (url: string, options: any) => {
  console.log(options, 'options');

  try {
    const res = await fetch(url, options);
    return await getJson(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshToken = getKeychain('refreshToken');
      const refreshData = await postRefreshToken(await refreshToken);
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setKeychain('accessToken', refreshData.accessToken);
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await getJson(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const register = async (email: string, password: string, roles: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/signup`,
      {email, password, roles},
      {headers: HEADERS},
    );

    return response.data; // вернёт данные от сервера
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    throw error; // пробрасываем ошибку дальше
  }
};

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/signin`,
      {email, password},
      {headers: HEADERS},
    );
    return response.data; // вернёт данные от сервера
  } catch (error) {
    console.error('Ошибка при входе:', error);
    throw error; // пробрасываем ошибку дальше
  }
};

// прописать logout
const postLogout = async (refreshToken: string | undefined) => {
  const response = await axios.delete(`${BASE_URL}/logout`, {
    headers: HEADERS,
    data: {refreshToken},
  });
  return response.data;
};

const examinationValidationToken = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        ...HEADERS, // если у тебя есть другие заголовки, например Content-Type
        Authorization: `Bearer ${token}`, // правильное расположение
      },
    });
    return response.data; // вернёт данные от сервера
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    throw error; // пробрасываем ошибку дальше
  }
};

export default {
  register,
  login,
  examinationValidationToken,
  postRefreshToken,
  postLogout,
};
