import * as Keychain from 'react-native-keychain';

export async function getKeychain(key: string) {
  try {
    const credentials = await Keychain.getGenericPassword({service: key});
    return credentials ? credentials.password : undefined;
  } catch (error) {
    console.warn('Ошибка токена', error);
    return undefined;
  }
}

export async function setKeychain(key: string, value: string) {
  try {
    await Keychain.setGenericPassword(key, value, {service: key});
  } catch (error) {
    console.warn('Ошибка токена', error);
  }
}

export async function deleteKeychain(key: string) {
  try {
    await Keychain.resetGenericPassword({service: key});
  } catch (error) {
    console.warn('Ошибка токена', error);
  }
}
