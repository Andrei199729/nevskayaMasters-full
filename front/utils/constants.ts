import {getKeychain} from './keychain';
export const TOKEN_PATH = 'token';
export const LOGOUT_PATH = 'logout';
export const accessToken = getKeychain('accessToken');
