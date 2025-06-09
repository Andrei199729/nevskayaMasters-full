import axios from 'axios';

export const BASE_URL = 'http://10.0.2.2:3000';

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const register = async (email: string, password: string, rules: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/signup`,
      {email, password, rules},
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
    console.error('Ошибка при регистрации:', error);
    throw error; // пробрасываем ошибку дальше
  }
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
};
