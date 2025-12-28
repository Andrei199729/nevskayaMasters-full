import {TApartmentAction} from '../actions/apartment';
import {
  ADD_APARTMENT,
  GET_APARTMENT_FAILED,
  GET_APARTMENT_REQUEST,
  SET_AUTH_LOGGED_IN,
  SET_FORM_APPLICATION,
  SET_VIEW_APPLICATION_ID,
  SET_VIEW_APPLICATION_FORM,
  RESET_FORM_APPLICATION,
} from '../constants/constants';
import {IApartment} from '../types/data';

interface IApartmentState {
  apartments: any;
  isAuthloggedIn: boolean;
  loading: boolean;
  error: string;
  formApplication: any;
  applicationId: any;
  isVisible: boolean;
}

const initialState: IApartmentState = {
  apartments: [],
  isAuthloggedIn: false,
  loading: false,
  error: '',
  formApplication: {},
  applicationId: {},
  isVisible: true,
};

export const apartmentReducer = (
  state = initialState,
  action: TApartmentAction,
): IApartmentState => {
  switch (action.type) {
    case SET_AUTH_LOGGED_IN:
      return {
        ...state,
        isAuthloggedIn: action.authloggedIn,
      };

    case SET_FORM_APPLICATION:
      return {...state, formApplication: action.payload, isVisible: false};
    case GET_APARTMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_APARTMENT_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case ADD_APARTMENT:
      return {
        ...state,
        apartments: action.payload,
        isVisible: true,
      };
    case RESET_FORM_APPLICATION:
      return {
        ...state,
        formApplication: {},
        isVisible: true,
      };
    // case PATCH_APARTMENT_REQUEST:
    // // return {...state, loading: true};

    // case PATCH_APARTMENT_SUCCESS:
    //   return {};

    // case PATCH_APARTMENT_FAILED:
    //   return {
    //     // ...state,
    //     // loading: false,
    //     // error: action.error,
    //   };
    case SET_VIEW_APPLICATION_ID:
      return {
        ...state,
        applicationId: action.applicationId,
      };
    case SET_VIEW_APPLICATION_FORM:
      return {
        ...state,
        isVisible: action.isVisible,
      };
    default:
      return state;
  }
};
