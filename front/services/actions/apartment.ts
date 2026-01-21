import api from '../../utils/api';
import {getKeychain} from '../../utils/keychain';
import {
  ADD_APARTMENT,
  CURRENT_APPLICATION_ID,
  GET_APARTMENT_FAILED,
  GET_APARTMENT_REQUEST,
  GET_APARTMENT_SUCCESS,
  PATCH_APARTMENT_FAILED,
  PATCH_APARTMENT_REQUEST,
  PATCH_APARTMENT_SUCCESS,
  POST_ADD_APARTMENT_FAILED,
  POST_ADD_APARTMENT_REQUEST,
  POST_ADD_APPLICATION_FAILED,
  POST_ADD_APPLICATION_REQUEST,
  POST_ADD_APPLICATION_SUCCESS,
  RESET_CURRENT_APPLICATION,
  RESET_FORM_APPLICATION,
  SET_FORM_APPLICATION,
  SET_VIEW_APPLICATION_FORM,
  SET_VIEW_APPLICATION_ID,
  UPDATE_APARTMENT_APPLICATION,
} from '../constants/constants';
import {AppDispatch} from '../types';
import {IApartment} from '../types/data';
import {resetRooms} from './room';

import {ISetAuthLoggedInAction, setAuthloggedIn} from './user';

export interface IGetApartmentSuccessAction {
  readonly type: typeof GET_APARTMENT_SUCCESS;
}

export interface IGetApartmentRequestAction {
  readonly type: typeof GET_APARTMENT_REQUEST;
}

export interface IGetApartmentFailedAction {
  readonly type: typeof GET_APARTMENT_FAILED;
  readonly error: string;
}

export interface IPostAddApplicationSuccessAction {
  readonly type: typeof POST_ADD_APPLICATION_SUCCESS;
  readonly payload: any;
}

export interface IPostAddApplicationRequestAction {
  readonly type: typeof POST_ADD_APPLICATION_REQUEST;
}

export interface IPostAddApplicationFailedAction {
  readonly type: typeof POST_ADD_APPLICATION_FAILED;
  readonly error: string;
}
// это тут
export interface IPatchApartmentSuccessAction {
  readonly type: typeof PATCH_APARTMENT_SUCCESS;
  readonly payload: any;
}

export interface IPatchApartmentRequestAction {
  readonly type: typeof POST_ADD_APARTMENT_REQUEST;
}

export interface IPatchApartmentFailedAction {
  readonly type: typeof POST_ADD_APARTMENT_FAILED;
  readonly error: string;
}

export interface IPatchEditApartmentSuccessAction {
  readonly type: typeof PATCH_APARTMENT_SUCCESS;
  readonly payload: {};
}

export interface IPatchApartmentSuccessAction {
  readonly type: typeof PATCH_APARTMENT_SUCCESS;
  readonly payload: any;
}

export interface IPatchEditApartmentRequestAction {
  readonly type: typeof PATCH_APARTMENT_REQUEST;
}

export interface IPatchEditApartmentFailedAction {
  readonly type: typeof PATCH_APARTMENT_FAILED;
  readonly error: string;
}

export interface IAddApartmentAction {
  readonly type: typeof ADD_APARTMENT;
  readonly payload: IApartment;
}

export interface ISetApplicationAction {
  readonly type: typeof SET_FORM_APPLICATION;
  readonly payload: any;
}

export interface ISetApplicationIdAction {
  readonly type: typeof SET_VIEW_APPLICATION_ID;
  readonly applicationId: any;
}
export interface ISetViewApplicationFormAction {
  readonly type: typeof SET_VIEW_APPLICATION_FORM;
  readonly isVisible: boolean;
}

export interface ISetViewApplicationFormAction {
  readonly type: typeof SET_VIEW_APPLICATION_FORM;
  readonly isVisible: boolean;
}

export interface IResetFormApplicationAction {
  readonly type: typeof RESET_FORM_APPLICATION;
}

export interface ICurrentApplicationIdAction {
  readonly type: typeof CURRENT_APPLICATION_ID;
  readonly payload: string | null;
}

export interface IResetCurrentApplication {
  readonly type: typeof RESET_CURRENT_APPLICATION;
}

export interface IUpdateApartmentApplication {
  readonly type: typeof UPDATE_APARTMENT_APPLICATION;
  readonly payload: {applicationId: string; dataApplication: any};
}

// Объединяем в Union

export type TApartmentAction =
  | IGetApartmentSuccessAction
  | IGetApartmentRequestAction
  | IGetApartmentFailedAction
  | IPatchApartmentFailedAction
  | IPatchApartmentRequestAction
  | IPatchApartmentSuccessAction
  | IPatchEditApartmentFailedAction
  | IPatchEditApartmentRequestAction
  | IPatchEditApartmentSuccessAction
  | ISetAuthLoggedInAction
  | IAddApartmentAction
  | ISetApplicationAction
  | ISetApplicationIdAction
  | ISetViewApplicationFormAction
  | IResetFormApplicationAction
  | IPostAddApplicationRequestAction
  | IPostAddApplicationFailedAction
  | IPostAddApplicationSuccessAction
  | ICurrentApplicationIdAction
  | IResetCurrentApplication
  | IUpdateApartmentApplication;

// генераторы экшенов
export const getApartmentRequestAction = (): IGetApartmentRequestAction => ({
  type: GET_APARTMENT_REQUEST,
});

export const getApartmentSuccessAction = (): IGetApartmentSuccessAction => ({
  type: GET_APARTMENT_SUCCESS,
});

export const getApartmentFailedAction = (
  error: string,
): IGetApartmentFailedAction => ({
  type: GET_APARTMENT_FAILED,
  error,
});

export const postAddApplicationRequestAction =
  (): IPostAddApplicationRequestAction => ({
    type: POST_ADD_APPLICATION_REQUEST,
  });
export const postAddApplicationSuccessAction = (
  payload: any,
): IPostAddApplicationSuccessAction => ({
  type: POST_ADD_APPLICATION_SUCCESS,
  payload,
});

export const postAddApplicationFailedAction = (
  error: string,
): IPostAddApplicationFailedAction => ({
  type: POST_ADD_APPLICATION_FAILED,
  error,
});

export const patchApartmentRequestAction =
  (): IPatchApartmentRequestAction => ({
    type: POST_ADD_APARTMENT_REQUEST,
  });

export const patchApartmentSuccessAction = (
  payload: any,
): IPatchApartmentSuccessAction => ({
  type: PATCH_APARTMENT_SUCCESS,
  payload,
});

export const patchApartmentFailedAction = (
  error: string,
): IPatchApartmentFailedAction => ({
  type: POST_ADD_APARTMENT_FAILED,
  error,
});

export const patchEditApartmentRequestAction =
  (): IPatchEditApartmentRequestAction => ({
    type: PATCH_APARTMENT_REQUEST,
  });

export const patchEditApartmentFailedAction = (
  error: string,
): IPatchEditApartmentFailedAction => ({
  type: PATCH_APARTMENT_FAILED,
  error,
});

export const patchEditApartmentSuccesAction =
  (payload: {}): IPatchEditApartmentSuccessAction => ({
    type: PATCH_APARTMENT_SUCCESS,
    payload,
  });

export const patchApartmentSuccesAction = (
  payload: any,
): IPatchApartmentSuccessAction => ({
  type: PATCH_APARTMENT_SUCCESS,
  payload,
});
export const setApartmentData = (payload: any): IAddApartmentAction => ({
  type: ADD_APARTMENT,
  payload,
});
export const setFormApplication = (
  application: any,
): ISetApplicationAction => ({
  type: SET_FORM_APPLICATION,
  payload: application,
});
export const setApplicationId = (
  applicationId: any,
): ISetApplicationIdAction => ({
  type: SET_VIEW_APPLICATION_ID,
  applicationId,
});

export const setViewApplicationForm = (
  isVisible: boolean,
): ISetViewApplicationFormAction => ({
  type: SET_VIEW_APPLICATION_FORM,
  isVisible,
});

export const resetFormApplication = (): IResetFormApplicationAction => ({
  type: RESET_FORM_APPLICATION,
});
export const currentApplicationId = (
  payload: string | null,
): ICurrentApplicationIdAction => ({
  type: CURRENT_APPLICATION_ID,
  payload,
});

export const resetCurrentApplication = (): IResetCurrentApplication => ({
  type: RESET_CURRENT_APPLICATION,
});

export const updateApartmentApplication = (
  applicationId: string,
  dataApplication: any,
): IUpdateApartmentApplication => ({
  type: UPDATE_APARTMENT_APPLICATION,
  payload: {applicationId, dataApplication},
});

export function addApplication() {
  return async function (dispatch: AppDispatch) {
    dispatch(postAddApplicationRequestAction());

    try {
      const application = await api.addApplication();
      if (!application || !application._id) {
        console.error('Ошибка: API вернул некорректную квартиру', application);
        dispatch(
          postAddApplicationFailedAction('Некорректные данные от сервера'),
        );
        return;
      }

      dispatch(postAddApplicationSuccessAction(application));
      dispatch(currentApplicationId(application._id));
      return {application};
    } catch (error: any) {
      dispatch(postAddApplicationFailedAction(error.message));
    }
  };
}

export function updateApartment(
  apartamentId: string | null,
  dataApplication: any,
) {
  return async function (dispatch: AppDispatch) {
    // 🔒 Защита: если id нет, выходим
    if (!apartamentId) {
      console.error('updateApartment: apartamentId не найден');
      return;
    }
    dispatch(patchApartmentRequestAction());

    try {
      const apartament = await api.addApartament(apartamentId, dataApplication);

      dispatch(patchApartmentSuccessAction(apartament));
      return {apartament};
    } catch (error: any) {
      dispatch(patchApartmentFailedAction(error.message));
    }
  };
}

export function getApartmentsInitial() {
  return async function (dispatch: AppDispatch) {
    dispatch(getApartmentRequestAction());
    try {
      const accessToken = await getKeychain('accessToken');

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      api.setToken(accessToken); // ✅ установить токен в API перед запросом
      const apartament = await api.getInitialApartaments();
      dispatch(setAuthloggedIn(true));

      if (apartament && apartament && Array.isArray(apartament)) {
        dispatch(setApartmentData(apartament));
      } else {
        console.warn('Некорректный формат данных от API');
        dispatch(getApartmentFailedAction('Некорректный формат данных'));
      }
    } catch (error: any) {
      dispatch(getApartmentFailedAction(error.message));
    }
  };
}

export function editApartment() {
  //   dataProduct: IDrawing[],
  //   dataId: string,
  //   numberCurrentWall: number | null,
  //   activeId: number | null,
  return async function (dispatch: AppDispatch) {
    dispatch(patchEditApartmentRequestAction());

    // try {
    //   const response = await api.editRoom(dataProduct, dataId);
    //   // логируем для проверки

    //   dispatch(
    //     patchEditApartmentSuccesAction(
    //       {
    //         dataId,
    //         dataProduct: response.dataProduct,
    //         numberCurrentWall,
    //         activeId,
    //       }, // можно response.data
    //     ),
    //   );
    // } catch (error: any) {
    //   dispatch(patchEditApartmentFailedAction(error));
    // }
  };
}

export function deleteApplication(apartamentId: string | null) {
  return async (dispatch: AppDispatch) => {
    if (!apartamentId) return;
    try {
      const response = await api.deleteApplication(apartamentId);
      const {success} = response;
      if (!success) {
        dispatch(resetCurrentApplication());
        dispatch(resetRooms());
        dispatch(resetFormApplication());
      }
    } catch (e) {
      console.error('Ошибка удаления заявки', e);
    }
  };
}
