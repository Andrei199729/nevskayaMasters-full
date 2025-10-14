import {TModalOpenAction} from '../actions/modalOpen';
import {
  SET_MODAL_VISIBLE_BACK_LIGHT,
  SET_MODAL_VISIBLE,
  SET_ELEMENTS_WALL_MODAL_VISIBLE,
  SET_IS_VISIBLE_EDIT_MODAL,
  SET_ELEMENT_MODAL_VISIBLE,
  SET_OPEN_FORM_DATA_SIZE,
} from '../constants/constants';

interface IModalOpenState {
  modalVisibleBacklight: boolean | number | null;
  modalVisible: {
    isVisible: boolean;
    wallNumber: number | null;
  };
  elementsWallModalVisible: {
    isVisible: boolean;
    wallNumber: number | null;
  };
  isVisibleEditModal: {
    isVisible: boolean;
    wallNumber: number | null;
    wallNumberElement: number | null;
  };
  elementModal: {
    isVisible: boolean;
    wallNumber: number | null;
    wallNumberElement: number | null;
  };

  openFormDataSize: {
    isOpen: boolean;
    wallNumber: number | null;
  };
}

const initialState: IModalOpenState = {
  modalVisibleBacklight: false,
  modalVisible: {
    isVisible: false,
    wallNumber: null,
  },
  elementsWallModalVisible: {
    isVisible: false,
    wallNumber: null,
  },
  isVisibleEditModal: {
    isVisible: false,
    wallNumber: null,
    wallNumberElement: null,
  },
  elementModal: {
    isVisible: false,
    wallNumber: null,
    wallNumberElement: null,
  },
  openFormDataSize: {
    isOpen: false,
    wallNumber: null,
  },
};

export const modalOpenReducer = (
  state = initialState,
  action: TModalOpenAction,
): IModalOpenState => {
  switch (action.type) {
    case SET_MODAL_VISIBLE_BACK_LIGHT:
      return {
        ...state,
        modalVisibleBacklight: action.payload,
      };

    case SET_MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: {
          isVisible: action.payload.isVisible,
          wallNumber: action.payload.wallNumber,
        },
      };

    case SET_ELEMENTS_WALL_MODAL_VISIBLE:
      return {
        ...state,
        elementsWallModalVisible: {
          isVisible: action.payload.isVisible,
          wallNumber: action.payload.wallNumber,
        },
      };

    case SET_IS_VISIBLE_EDIT_MODAL:
      return {
        ...state,
        isVisibleEditModal: {
          isVisible: action.payload.isVisible,
          wallNumber: action.payload.wallNumber,
          wallNumberElement: action.payload.wallNumberElement,
        },
      };

    case SET_ELEMENT_MODAL_VISIBLE:
      return {
        ...state,
        elementModal: {
          isVisible: action.payload.isVisible,
          wallNumber: action.payload.wallNumber,
          wallNumberElement: action.payload.wallNumberElement,
        },
      };
    case SET_OPEN_FORM_DATA_SIZE:
      return {
        ...state,
        openFormDataSize: {
          isOpen: action.payload.isOpen,
          wallNumber: action.payload.wallNumber,
        },
      };
    default:
      return state;
  }
};
