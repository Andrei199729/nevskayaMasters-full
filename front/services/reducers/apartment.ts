import {IApartments, INormalizedSize} from '../../shared/types';
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
  POST_ADD_APPLICATION_SUCCESS,
  PATCH_APARTMENT_SUCCESS,
  CURRENT_APPLICATION_ID,
  RESET_CURRENT_APPLICATION,
  UPDATE_APARTMENT_APPLICATION,
  RESET_VIEW_APPLICATION_ID,
  SET_LOADING_APARTMENTS,
} from '../constants/constants';

interface IApartmentState {
  apartments: IApartments[];
  isAuthloggedIn: boolean;
  loading: boolean;
  error: string;
  formApplication: INormalizedSize | null;
  applicationId: string | null;
  isVisible: boolean;
  currentIdApplication: string | null;
}

const initialState: IApartmentState = {
  apartments: [],
  isAuthloggedIn: false,
  loading: false,
  error: '',
  formApplication: null,
  applicationId: null,
  isVisible: true,
  currentIdApplication: null,
};

export const apartmentReducer = (
  state = initialState,
  action: TApartmentAction,
): IApartmentState => {
  switch (action.type) {
    case SET_LOADING_APARTMENTS:
      return {
        ...state,
        loading: action.payload,
      };
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
      };

    case GET_APARTMENT_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case POST_ADD_APPLICATION_SUCCESS:
      return {
        ...state,
        apartments: [action.payload, ...state.apartments],
        isVisible: true,
        applicationId: null,
        formApplication: null,
        currentIdApplication: null,
      };
    case ADD_APARTMENT:
      return {
        ...state,
        apartments: action.payload,
        isVisible: true,
      };
    case PATCH_APARTMENT_SUCCESS: {
      // создаём новый массив с обновлённой квартирой
      const updatedApartments = state.apartments.map(item => {
        return item._id === action.id ? action.updateApartment : item;
      });

      return {
        ...state,
        apartments: updatedApartments,
      };
    }

    case RESET_FORM_APPLICATION:
      return {
        ...state,
        formApplication: null,
        isVisible: true,
      };
    case CURRENT_APPLICATION_ID:
      return {
        ...state,
        currentIdApplication: action.payload,
      };

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
    case RESET_CURRENT_APPLICATION:
      return {
        ...state,
        currentIdApplication: null,
      };
    case UPDATE_APARTMENT_APPLICATION: {
      const {applicationId, dataApplication} = action.payload;

      return {
        ...state,
        apartments: state.apartments.map((apartment: IApartments) =>
          apartment._id === applicationId
            ? {
                ...apartment,
                dataApplication,
              }
            : apartment,
        ),
        applicationId: null,
      };
    }
    case RESET_VIEW_APPLICATION_ID:
      return {
        ...state,
        applicationId: null,
      };
    default:
      return state;
  }
};
