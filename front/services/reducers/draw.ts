import {IExternalSizeWall} from '../../shared/types';
import {TDrawAction} from '../actions/draw';
import {
  CURRENT_LINE_DASHARRAYS,
  RESET_LINE_DASHARRAYS,
  SET_DATA_EDIT_WALL,
  SET_IS_STYLE_LINE,
  SET_SELECTED_LINE,
  SET_UPDATE_STROKE_DASHARRAYS,
} from '../constants/constants';

interface IDrawState {
  selectedLine: number | null;
  isStyleLine: {
    isLine: boolean;
    numberWall: number | null;
  };
  strokeDasharrays: {[key: number]: string};
  dataWall: {
    dataEditWall: IExternalSizeWall;
    currentWall: number;
  };
}

const initialState: IDrawState = {
  selectedLine: null,
  isStyleLine: {
    isLine: false,
    numberWall: null,
  },
  strokeDasharrays: {},
  dataWall: {
    dataEditWall: {},
    currentWall: 0,
  },
};

export const drawReducer = (
  state = initialState,
  action: TDrawAction,
): IDrawState => {
  switch (action.type) {
    case SET_SELECTED_LINE:
      return {
        ...state,
        selectedLine:
          state.selectedLine === action.payload ? null : action.payload,
      };
    case SET_IS_STYLE_LINE:
      return {
        ...state,
        isStyleLine: {
          isLine: action.payload.isLine,
          numberWall: action.payload.numberWall,
        },
      };
    case SET_UPDATE_STROKE_DASHARRAYS:
      const newDasharray =
        state.strokeDasharrays[action.payload] === '0' ? '10' : '0'; // Пример: переключаем между '10' и '0'
      return {
        ...state,
        strokeDasharrays: {
          ...state.strokeDasharrays,
          [action.payload]: newDasharray,
        },
      };
    case CURRENT_LINE_DASHARRAYS:
      return {
        ...state,
        strokeDasharrays: {
          ...state.strokeDasharrays,
          [action.payload.index - 1]: action.payload.strockLine,
        },
      };
    case SET_DATA_EDIT_WALL:
      return {
        ...state,
        dataWall: {
          dataEditWall: action.payload.dataEditWall,
          currentWall: action.payload.currentWall,
        },
      };
    case RESET_LINE_DASHARRAYS:
      return {
        ...state,
        strokeDasharrays: {},
      };
    default:
      return state;
  }
};
