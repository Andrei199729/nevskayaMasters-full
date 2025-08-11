import {IExternalSizeWall} from '../../shared/types';
import {
  CURRENT_LINE_DASHARRAYS,
  RESET_LINE_DASHARRAYS,
  SET_DATA_EDIT_WALL,
  SET_IS_STYLE_LINE,
  SET_SELECTED_LINE,
  SET_UPDATE_STROKE_DASHARRAYS,
} from '../constants/constants';

export interface ISetSelectedLine {
  readonly type: typeof SET_SELECTED_LINE;
  readonly payload: number;
}

export interface ISetIsStyleLine {
  readonly type: typeof SET_IS_STYLE_LINE;
  readonly payload: {
    numberWall: number | null;
    isLine: boolean;
  };
}

export interface ISetUpdateStrokeDasharrays {
  readonly type: typeof SET_UPDATE_STROKE_DASHARRAYS;
  readonly payload: number;
}

export interface ISetCurrentLineDasharrays {
  readonly type: typeof CURRENT_LINE_DASHARRAYS;
  readonly payload: {
    index: number;
    strockLine: string;
  };
}

export interface IsetDataEditWall {
  readonly type: typeof SET_DATA_EDIT_WALL;
  readonly payload: {
    dataEditWall: IExternalSizeWall;
    currentWall: number;
  };
}

export interface ISetResetLineDasharrays {
  readonly type: typeof RESET_LINE_DASHARRAYS;
}

export type TDrawAction =
  | ISetSelectedLine
  | ISetIsStyleLine
  | ISetUpdateStrokeDasharrays
  | ISetCurrentLineDasharrays
  | IsetDataEditWall
  | ISetResetLineDasharrays;

export const setSelectedLine = (index: number): ISetSelectedLine => ({
  type: SET_SELECTED_LINE,
  payload: index,
});

export const setIsStyleLine = (payload: {
  numberWall: number | null;
  isLine: boolean;
}): ISetIsStyleLine => ({
  type: SET_IS_STYLE_LINE,
  payload,
});

export const setUpdateStrokeDasharrays = (
  payload: number,
): ISetUpdateStrokeDasharrays => ({
  type: SET_UPDATE_STROKE_DASHARRAYS,
  payload,
});

export const setCurrentLineDasharrays = (payload: {
  index: number;
  strockLine: string;
}): ISetCurrentLineDasharrays => ({
  type: CURRENT_LINE_DASHARRAYS,
  payload,
});

export const setDataEditWall = (payload: {
  dataEditWall: IExternalSizeWall;
  currentWall: number;
}): IsetDataEditWall => ({
  type: SET_DATA_EDIT_WALL,
  payload,
});

export const setResetLinedasharrays = (): ISetResetLineDasharrays => ({
  type: RESET_LINE_DASHARRAYS,
});
