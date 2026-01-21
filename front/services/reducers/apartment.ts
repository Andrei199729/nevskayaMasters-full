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
} from '../constants/constants';

interface IApartmentState {
  apartments: any;
  isAuthloggedIn: boolean;
  loading: boolean;
  error: string;
  formApplication: any;
  applicationId: any;
  isVisible: boolean;
  currentIdApplication: string | null;
}

const initialState: IApartmentState = {
  apartments: [],
  isAuthloggedIn: false,
  loading: false,
  error: '',
  formApplication: {},
  applicationId: {},
  isVisible: true,
  currentIdApplication: null,
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
    case POST_ADD_APPLICATION_SUCCESS:
      return {
        ...state,
        apartments: [action.payload, ...state.apartments],
        isVisible: true,
      };
    case ADD_APARTMENT:
      return {
        ...state,
        apartments: action.payload,
        isVisible: true,
      };
    case PATCH_APARTMENT_SUCCESS:
      return {
        ...state,
        apartments: state.apartments.map((item: {_id: string}) =>
          item._id === action.payload._id ? action.payload : item,
        ),
      };
    case RESET_FORM_APPLICATION:
      return {
        ...state,
        formApplication: {},
        isVisible: true,
      };
    case CURRENT_APPLICATION_ID:
      return {
        ...state,
        currentIdApplication: action.payload,
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
    case RESET_CURRENT_APPLICATION:
      return {
        ...state,
        currentIdApplication: null,
      };
    case UPDATE_APARTMENT_APPLICATION: {
      const {applicationId, dataApplication} = action.payload;

      return {
        ...state,
        apartments: state.apartments.map((apartment: any) =>
          apartment._id === applicationId
            ? {
                ...apartment,
                dataApplication,
              }
            : apartment,
        ),
      };
    }
    default:
      return state;
  }
};
