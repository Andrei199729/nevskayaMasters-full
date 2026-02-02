import {getKeychain} from './keychain';
export const TOKEN_PATH = 'token';
export const accessToken = getKeychain('accessToken');
