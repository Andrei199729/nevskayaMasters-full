import api from '../../utils/api';
import {getKeychain} from '../../utils/keychain';
import {
  ADD_APARTMENT,
  GET_APARTMENT_FAILED,
  GET_APARTMENT_REQUEST,
  GET_APARTMENT_SUCCESS,
  PATCH_APARTMENT_FAILED,
  PATCH_APARTMENT_REQUEST,
  PATCH_APARTMENT_SUCCESS,
  POST_ADD_APARTMENT_FAILED,
  POST_ADD_APARTMENT_REQUEST,
  POST_ADD_APARTMENT_SUCCESS,
  RESET_FORM_APPLICATION,
  SET_FORM_APPLICATION,
  SET_VIEW_APPLICATION_FORM,
  SET_VIEW_APPLICATION_ID,
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

export interface IPostAddApartmentSuccessAction {
  readonly type: typeof POST_ADD_APARTMENT_SUCCESS;
  readonly payload: any;
}

export interface IPostAddApartmentRequestAction {
  readonly type: typeof POST_ADD_APARTMENT_REQUEST;
}

export interface IPostAddApartmentFailedAction {
  readonly type: typeof POST_ADD_APARTMENT_FAILED;
  readonly error: string;
}

export interface IPatchEditApartmentSuccessAction {
  readonly type: typeof PATCH_APARTMENT_SUCCESS;
  readonly payload: {};
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
// Объединяем в Union

export type TApartmentAction =
  | IGetApartmentSuccessAction
  | IGetApartmentRequestAction
  | IGetApartmentFailedAction
  | IPostAddApartmentFailedAction
  | IPostAddApartmentRequestAction
  | IPostAddApartmentSuccessAction
  | IPatchEditApartmentFailedAction
  | IPatchEditApartmentRequestAction
  | IPatchEditApartmentSuccessAction
  | ISetAuthLoggedInAction
  | IAddApartmentAction
  | ISetApplicationAction
  | ISetApplicationIdAction
  | ISetViewApplicationFormAction
  | IResetFormApplicationAction;

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

export const postAddApartmentRequestAction =
  (): IPostAddApartmentRequestAction => ({
    type: POST_ADD_APARTMENT_REQUEST,
  });

export const postAddApartmentSuccessAction = (
  payload: any,
): IPostAddApartmentSuccessAction => ({
  type: POST_ADD_APARTMENT_SUCCESS,
  payload,
});

export const postAddApartmentFailedAction = (
  error: string,
): IPostAddApartmentFailedAction => ({
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

export function addApartment(dataApplication: any) {
  return async function (dispatch: AppDispatch) {
    dispatch(postAddApartmentRequestAction());

    try {
      const apartament = await api.addApartament(dataApplication);
      console.log(dataApplication, 'dataApplication-redux');

      dispatch(postAddApartmentSuccessAction(apartament));
      console.log(apartament, 'apartament-redux');
      return {apartament};
    } catch (error: any) {
      dispatch(postAddApartmentFailedAction(error.message));
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
      console.log(apartament, 'apartament initial');

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
