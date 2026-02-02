import {IApartments, INormalizedSize} from '../../shared/types';
import api from '../../utils/api';
import {getErrorMessage} from '../../utils/errorHandler';
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
  RESET_VIEW_APPLICATION_ID,
  SET_FORM_APPLICATION,
  SET_LOADING_APARTMENTS,
  SET_VIEW_APPLICATION_FORM,
  SET_VIEW_APPLICATION_ID,
  UPDATE_APARTMENT_APPLICATION,
} from '../constants/constants';
import {AppDispatch} from '../types';
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
  readonly payload: IApartments;
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
  readonly id: string;
  readonly updateApartment: IApartments;
}

export interface IPatchApartmentRequestAction {
  readonly type: typeof POST_ADD_APARTMENT_REQUEST;
}

export interface IPatchApartmentFailedAction {
  readonly type: typeof POST_ADD_APARTMENT_FAILED;
  readonly error: string;
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
  readonly payload: IApartments[];
}

export interface ISetApplicationAction {
  readonly type: typeof SET_FORM_APPLICATION;
  readonly payload: INormalizedSize | null;
}

export interface ISetApplicationIdAction {
  readonly type: typeof SET_VIEW_APPLICATION_ID;
  readonly applicationId: string | null;
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
  readonly payload: {
    applicationId: string | null;
    dataApplication: INormalizedSize;
  };
}

export interface IResetViewApplicationId {
  readonly type: typeof RESET_VIEW_APPLICATION_ID;
}
// Объединяем в Union
export interface ISetLoadingApartmentsAction {
  readonly type: typeof SET_LOADING_APARTMENTS;
  readonly payload: boolean;
}

export type TApartmentAction =
  | IGetApartmentSuccessAction
  | IGetApartmentRequestAction
  | IGetApartmentFailedAction
  | IPatchApartmentFailedAction
  | IPatchApartmentRequestAction
  | IPatchApartmentSuccessAction
  | IPatchEditApartmentFailedAction
  | IPatchEditApartmentRequestAction
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
  | IUpdateApartmentApplication
  | IResetViewApplicationId
  | ISetLoadingApartmentsAction;

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
  payload: IApartments,
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
  id: string,
  updateApartment: IApartments,
): IPatchApartmentSuccessAction => ({
  type: PATCH_APARTMENT_SUCCESS,
  id,
  updateApartment,
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

export const setApartmentData = (
  payload: IApartments[],
): IAddApartmentAction => ({
  type: ADD_APARTMENT,
  payload,
});
export const setFormApplication = (
  application: INormalizedSize | null,
): ISetApplicationAction => ({
  type: SET_FORM_APPLICATION,
  payload: application,
});
export const setApplicationId = (
  applicationId: string | null,
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
  applicationId: string | null,
  dataApplication: INormalizedSize,
): IUpdateApartmentApplication => ({
  type: UPDATE_APARTMENT_APPLICATION,
  payload: {applicationId, dataApplication},
});

export const resetViewApplicationId = (): IResetViewApplicationId => ({
  type: RESET_VIEW_APPLICATION_ID,
});

export const setLoadingApartments = (
  payload: boolean,
): ISetLoadingApartmentsAction => ({
  type: SET_LOADING_APARTMENTS,
  payload,
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
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        'Некорректные данные от сервера',
      );
      dispatch(postAddApplicationFailedAction(errorMessage));
    }
  };
}

export function updateApartment(
  apartmentId: string | null,
  dataApplication: INormalizedSize | null,
) {
  return async function (dispatch: AppDispatch): Promise<IApartments | void> {
    // 🔒 Защита: если id нет, выходим
    if (!apartmentId) {
      console.error('updateApartment: apartmentId не найден');
      return;
    }
    dispatch(patchApartmentRequestAction());

    try {
      const apartment = await api.addApartment(apartmentId, dataApplication);
      console.log(apartment, 'apartment');

      if (apartment) {
        dispatch(patchApartmentSuccessAction(apartmentId, apartment)); // точно IApartments
      }
      return apartment;
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        'Ошибка редактировния заявки',
      );
      dispatch(patchApartmentFailedAction(errorMessage));
    }
  };
}

export function getApartmentsInitial() {
  return async function (dispatch: AppDispatch) {
    dispatch(getApartmentRequestAction());
    dispatch(setLoadingApartments(true));
    try {
      const accessToken = await getKeychain('accessToken');

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      api.setToken(accessToken); // ✅ установить токен в API перед запросом
      const apartment = await api.getInitialApartments();
      dispatch(setAuthloggedIn(true));

      if (apartment && apartment && Array.isArray(apartment)) {
        dispatch(setApartmentData(apartment));
      } else {
        console.warn('Некорректный формат данных от API');
        dispatch(getApartmentFailedAction('Некорректный формат данных'));
      }
      dispatch(setLoadingApartments(false));
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Некорректный формат данных');
      dispatch(getApartmentFailedAction(errorMessage));
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

export function deleteApplication(apartmentId: string | null) {
  return async (dispatch: AppDispatch) => {
    if (!apartmentId) return;
    try {
      const response = await api.deleteApplication(apartmentId);
      const {success} = response;
      if (!success) {
        dispatch(resetCurrentApplication());
        dispatch(resetRooms());
        dispatch(resetFormApplication());
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Ошибка удаления заявки');
      console.error('Ошибка удаления заявки', errorMessage);
    }
  };
}
