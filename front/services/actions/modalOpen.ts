import {
  SET_ELEMENT_MODAL_VISIBLE,
  SET_ELEMENTS_WALL_MODAL_VISIBLE,
  SET_IS_VISIBLE_EDIT_MODAL,
  SET_MODAL_VISIBLE,
  SET_MODAL_VISIBLE_BACK_LIGHT,
  SET_OPEN_FORM_DATA_SIZE,
} from '../constants/constants';

export interface ISetModalVisibleBackLight {
  readonly type: typeof SET_MODAL_VISIBLE_BACK_LIGHT;
  readonly payload: boolean | number | null;
}

export interface ISetModalVisible {
  readonly type: typeof SET_MODAL_VISIBLE;
  readonly payload: {
    isVisible: boolean;
    wallNumber: number | null;
  };
}

export interface ISetElementsWallModalVisible {
  readonly type: typeof SET_ELEMENTS_WALL_MODAL_VISIBLE;
  readonly payload: {
    isVisible: boolean;
    wallNumber: number | null;
  };
}

export interface ISetIsVisibleEditModal {
  readonly type: typeof SET_IS_VISIBLE_EDIT_MODAL;
  readonly payload: {
    isVisible: boolean;
    wallNumber: number | null;
    wallNumberElement: number | null;
  };
}

export interface ISetElementModalVisible {
  readonly type: typeof SET_ELEMENT_MODAL_VISIBLE;
  readonly payload: {
    isVisible: boolean;
    wallNumber: number | null;
    wallNumberElement: number | null;
  };
}

export interface ISetOpenFormDataSize {
  readonly type: typeof SET_OPEN_FORM_DATA_SIZE;
  readonly payload: {
    isOpen: boolean;
    wallNumber: number | null;
  };
}

export type TModalOpenAction =
  | ISetModalVisibleBackLight
  | ISetModalVisible
  | ISetElementsWallModalVisible
  | ISetIsVisibleEditModal
  | ISetElementModalVisible
  | ISetOpenFormDataSize;

export const setModalVisibleBacklight = (
  modalVisibleBacklight: boolean | number | null,
): ISetModalVisibleBackLight => ({
  type: SET_MODAL_VISIBLE_BACK_LIGHT,
  payload: modalVisibleBacklight,
});

export const setModalVisible = (payload: {
  isVisible: boolean;
  wallNumber: number | null;
}): ISetModalVisible => ({
  type: SET_MODAL_VISIBLE,
  payload,
});

export const setElementsWallModalVisible = (payload: {
  isVisible: boolean;
  wallNumber: number | null;
}): ISetElementsWallModalVisible => ({
  type: SET_ELEMENTS_WALL_MODAL_VISIBLE,
  payload,
});

export const setElementModalVisible = (payload: {
  isVisible: boolean;
  wallNumber: number | null;
  wallNumberElement: number | null;
}): ISetElementModalVisible => ({
  type: SET_ELEMENT_MODAL_VISIBLE,
  payload,
});

export const setIsVisibleEditModal = (payload: {
  isVisible: boolean;
  wallNumber: number | null;
  wallNumberElement: number | null;
}): ISetIsVisibleEditModal => ({
  type: SET_IS_VISIBLE_EDIT_MODAL,
  payload,
});

export const setOpenFormDataSize = (payload: {
  isOpen: boolean;
  wallNumber: number | null;
}): ISetOpenFormDataSize => ({
  type: SET_OPEN_FORM_DATA_SIZE,
  payload,
});
