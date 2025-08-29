import {
  IDataElementsWall,
  IElementData,
  IPaths,
  IPoint,
  IProductRoom,
  IWall,
  TClickButtonBlockDimensions,
} from '../../shared/types';
import api from '../../utils/api';
import {getKeychain} from '../../utils/keychain';
import {
  ADD_OR_UPDATE_ROOM,
  GET_ROOM_FAILED,
  GET_ROOM_REQUEST,
  GET_ROOM_SUCCESS,
  SET_ROOM_DATA,
  ADD_ROOM_DATA,
  POST_ADD_ROOM_SUCCESS,
  POST_ADD_ROOM_REQUEST,
  POST_ADD_ROOM_FAILED,
  NOTIFICATION_SAVE_ROOM,
  PATHS,
  WALLS_DATA,
  SET_CURRENT_PATH,
  ADD_TO_CURRENT_PATH,
  SET_LAST_POINT,
  CLEAR_PATHS,
  POINTS,
  CLEAR_POINTS,
  UPDATE_LAST_DRAWING_WALLS,
  UPDATE_SIZE_WALLS,
  DATA_OBJ,
  ELEMENTS_DATA,
  UPDATE_ELEMENT_ROOM,
  RESET_CURRENT_DRAWING,
  SET_COUNT_WALL_DRAW,
  // EDIT_ELEMENT,
  DELETE_ELEMENT_ROOM,
  SET_ACTIVE_WALL_INDEX,
  SET_VISIBLE_ELEMENTS,
  SET_CLICK_DATA_WALL,
  SET_CURRENT_ROOM_ID,
  SET_DATA_EDIT_WALL,
  PATCH_ROOM_SUCCESS,
  PATCH_ROOM_REQUEST,
  PATCH_ROOM_FAILED,
  SET_ACTIVE_ELEMENT_ID,
  ADD_ELEMENT_ROOM,
} from '../constants/constants';
import {AppDispatch} from '../types';
import {ISetAuthLoggedInAction, setAuthloggedIn} from './user';

// Типизация экшенов

export interface IGetRoomSuccessAction {
  readonly type: typeof GET_ROOM_SUCCESS;
}

export interface IGetRoomRequestAction {
  readonly type: typeof GET_ROOM_REQUEST;
}

export interface IGetRoomFailedAction {
  readonly type: typeof GET_ROOM_FAILED;
  readonly error: string;
}

export interface IPostAddRoomSuccessAction {
  readonly type: typeof POST_ADD_ROOM_SUCCESS;
  readonly payload: any;
}

export interface IPostAddRoomRequestAction {
  readonly type: typeof POST_ADD_ROOM_REQUEST;
}

export interface IPostAddRoomFailedAction {
  readonly type: typeof POST_ADD_ROOM_FAILED;
  readonly error: string;
}

export interface IPatchEditRoomSuccessAction {
  readonly type: typeof PATCH_ROOM_SUCCESS;
  readonly payload: {
    dataId: number;
    dataProduct: any;
    numberCurrentWall: number | null;
    activeId: any;
  };
}

export interface IPatchEditRoomRequestAction {
  readonly type: typeof PATCH_ROOM_REQUEST;
}

export interface IPatchEditRoomFailedAction {
  readonly type: typeof PATCH_ROOM_FAILED;
  readonly error: string;
}

export interface ISetRoomRequestAction {
  readonly type: typeof SET_ROOM_DATA;
  readonly payload: IProductRoom;
}

export interface IAddOrUpdateRoomAction {
  readonly type: typeof ADD_OR_UPDATE_ROOM;
  readonly payload: IProductRoom;
}

export interface IAddRoomDataAction {
  readonly type: typeof ADD_ROOM_DATA;
  readonly payload: IProductRoom;
}

export interface INotificationSaveRoomAction {
  readonly type: typeof NOTIFICATION_SAVE_ROOM;
  readonly payload: {points: any; wallsData: any};
}

export interface IUpdateLastDrawingWallsAction {
  readonly type: typeof UPDATE_LAST_DRAWING_WALLS;
  readonly payload: IWall[];
}

export interface IUpdateSizeWallsAction {
  readonly type: typeof UPDATE_SIZE_WALLS;
  readonly payload: {
    data: IElementData;
    dataObj: IDataElementsWall;
    numberCurrentWall: number;
    wallId: number;
    roomId: number;
  };
}

export interface IPathsAction {
  readonly type: typeof PATHS;
  readonly payload: IPaths;
}
export interface IPointsAction {
  readonly type: typeof POINTS;
  readonly payload: IPoint[];
}
export interface IClearPathsAction {
  readonly type: typeof CLEAR_PATHS;
}

export interface IClearPointsAction {
  readonly type: typeof CLEAR_POINTS;
}

export interface IWallsDataAction {
  readonly type: typeof WALLS_DATA;
  readonly payload: {
    walls: IWall[]; // текущий массив стен из состояния (через useSelector)
    normalizedSize: any;
    numberWallIndex: number;
  };
}

export interface ISetCurrentPathAction {
  readonly type: typeof SET_CURRENT_PATH;
  readonly payload: string;
}

export interface IAddToCurrentPathAction {
  readonly type: typeof ADD_TO_CURRENT_PATH;
  readonly payload: {x: number; y: number};
}

export interface ISetLastPointAction {
  readonly type: typeof SET_LAST_POINT;
  readonly payload: IPoint | null;
}

export interface ISetDataObjAction {
  readonly type: typeof DATA_OBJ;
  readonly payload: IDataElementsWall;
}

export interface ISetElementsDataAction {
  readonly type: typeof ELEMENTS_DATA;
  readonly payload: {
    data: IElementData;
    dataObj: IDataElementsWall;
    wallId: number;
    roomIndex: any;
  };
}

export interface ISetUpdateElementsDataAction {
  readonly type: typeof UPDATE_ELEMENT_ROOM;
  readonly payload: {
    numberWall: number;
    numberEl: number | null;
    updatedData: IElementData;
    dataObj: any;
    roomId: any;
  };
}

export interface IResetCurrentDrawingAction {
  readonly type: typeof RESET_CURRENT_DRAWING;
}
export interface ISetCountWallDrawAction {
  readonly type: typeof SET_COUNT_WALL_DRAW;
  readonly payload: number;
}

export interface IAddElementRoom {
  readonly type: typeof ADD_ELEMENT_ROOM;
  readonly payload: {
    wallId: number;
    roomId: number;
    dataElement: any;
    dataElementObj: any;
    idElement: number;
  };
}

export interface IDeleteElement {
  readonly type: typeof DELETE_ELEMENT_ROOM;
  readonly payload: {
    roomId: number;
    wallId: number;
    elementId: number | null;
    positionEl: number;
  };
}
export interface ISetActiveWallIndex {
  readonly type: typeof SET_ACTIVE_WALL_INDEX;
  readonly payload: number;
}

export interface ISetVisibleElements {
  readonly type: typeof SET_VISIBLE_ELEMENTS;
  readonly payload: {
    index: number;
    isVisible: boolean;
  };
}

export interface ISetClickDataWall {
  readonly type: typeof SET_CLICK_DATA_WALL;
  readonly payload: {
    isVisible: boolean;
    nameButton: TClickButtonBlockDimensions;
  };
}

export interface ISetCurrentRoomId {
  readonly type: typeof SET_CURRENT_ROOM_ID;
  readonly payload: any;
}

export interface IsetDataEditWall {
  readonly type: typeof SET_DATA_EDIT_WALL;
  readonly payload: {
    dataEditWall: any;
    currentWall: number;
  };
}

export interface ISetActiveElementId {
  readonly type: typeof SET_ACTIVE_ELEMENT_ID;
  readonly payload: number | null;
}

// Объединяем в Union

export type TRoomAction =
  | IGetRoomSuccessAction
  | IGetRoomRequestAction
  | IGetRoomFailedAction
  | ISetRoomRequestAction
  | IAddOrUpdateRoomAction
  | ISetAuthLoggedInAction
  | IAddRoomDataAction
  | IPostAddRoomSuccessAction
  | IPostAddRoomRequestAction
  | IPostAddRoomFailedAction
  | INotificationSaveRoomAction
  | IUpdateLastDrawingWallsAction
  | IUpdateSizeWallsAction
  | IPathsAction
  | IWallsDataAction
  | ISetCurrentPathAction
  | IAddToCurrentPathAction
  | ISetLastPointAction
  | IClearPathsAction
  | IClearPointsAction
  | IPointsAction
  | ISetDataObjAction
  | ISetElementsDataAction
  | ISetUpdateElementsDataAction
  | IResetCurrentDrawingAction
  | ISetCountWallDrawAction
  | IAddElementRoom
  | IDeleteElement
  | ISetActiveWallIndex
  | ISetVisibleElements
  | ISetClickDataWall
  | ISetCurrentRoomId
  | IsetDataEditWall
  | IPatchEditRoomFailedAction
  | IPatchEditRoomRequestAction
  | IPatchEditRoomSuccessAction
  | ISetActiveElementId;
// генераторы экшенов
export const getRoomRequestAction = (): IGetRoomRequestAction => ({
  type: GET_ROOM_REQUEST,
});

export const getRoomSuccessAction = (): IGetRoomSuccessAction => ({
  type: GET_ROOM_SUCCESS,
});

export const getRoomFailedAction = (error: string): IGetRoomFailedAction => ({
  type: GET_ROOM_FAILED,
  error,
});

export const postAddRoomRequestAction = (): IPostAddRoomRequestAction => ({
  type: POST_ADD_ROOM_REQUEST,
});

export const postAddRoomSuccessAction = (
  room: any,
): IPostAddRoomSuccessAction => ({
  type: POST_ADD_ROOM_SUCCESS,
  payload: room,
});

export const postAddRoomFailedAction = (
  error: string,
): IPostAddRoomFailedAction => ({
  type: POST_ADD_ROOM_FAILED,
  error,
});

export const setRoomData = (roomData: IProductRoom): ISetRoomRequestAction => ({
  type: SET_ROOM_DATA,
  payload: roomData,
});

export const addOrUpdateRoom = (
  room: IProductRoom,
): IAddOrUpdateRoomAction => ({
  type: ADD_OR_UPDATE_ROOM,
  payload: room,
});

export const addRoomData = (room: IProductRoom): IAddRoomDataAction => ({
  type: ADD_ROOM_DATA,
  payload: room,
});

export const notificationSaveRoom = (
  points: IPoint[],
  wallsData: IWall[],
): INotificationSaveRoomAction => ({
  type: NOTIFICATION_SAVE_ROOM,
  payload: {points, wallsData},
});

export const updateLastDrawingWalls = (
  wallsData: IWall[],
): IUpdateLastDrawingWallsAction => ({
  type: UPDATE_LAST_DRAWING_WALLS,
  payload: wallsData,
});

export const setUpdateSizeWalls = (
  data: IElementData,
  dataObj: IDataElementsWall,
  numberCurrentWall: number,
  wallId: number,
  roomId: number,
): IUpdateSizeWallsAction => ({
  type: UPDATE_SIZE_WALLS,
  payload: {data, dataObj, numberCurrentWall, wallId, roomId},
});

export const setPaths = (path: string, length: number): IPathsAction => ({
  type: PATHS,
  payload: {path, length},
});

export const setPoints = (
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number,
): IPointsAction => ({
  type: POINTS,
  payload: [
    {x: xStart, y: yStart},
    {x: xEnd, y: yEnd},
  ],
});

export const clearPaths = (): IClearPathsAction => ({
  type: CLEAR_PATHS,
});

export const clearPoints = (): IClearPointsAction => ({
  type: CLEAR_POINTS,
});

export const setWallsData = (
  walls: IWall[],
  normalizedSize: any,
  numberWallIndex: number,
): IWallsDataAction => ({
  type: WALLS_DATA,
  payload: {
    walls,
    normalizedSize,
    numberWallIndex,
  },
});

export const setCurrentPath = (path: string): ISetCurrentPathAction => ({
  type: SET_CURRENT_PATH,
  payload: path,
});

export const addToCurrentPath = (
  x: number,
  y: number,
): IAddToCurrentPathAction => ({
  type: ADD_TO_CURRENT_PATH,
  payload: {x, y},
});

export const setLastPoint = (point: IPoint | null): ISetLastPointAction => ({
  type: SET_LAST_POINT,
  payload: point,
});

export const setDataObj = (dataEl: IDataElementsWall): ISetDataObjAction => ({
  type: DATA_OBJ,
  payload: dataEl,
});

export const setElementsData = (
  data: IElementData,
  dataObj: IDataElementsWall,
  wallId: number,
  roomIndex: any,
): ISetElementsDataAction => ({
  type: ELEMENTS_DATA,
  payload: {data, dataObj, wallId, roomIndex},
});
export const setUpdateElementsData = (
  numberWall: number,
  numberEl: number | null,
  updatedData: IElementData,
  dataObj: any,
  roomId: any,
): ISetUpdateElementsDataAction => ({
  type: UPDATE_ELEMENT_ROOM,
  payload: {numberWall, numberEl, updatedData, dataObj, roomId},
});

export const resetCurrentDrawing = (): IResetCurrentDrawingAction => ({
  type: RESET_CURRENT_DRAWING,
});

export const setCountWallDraw = (
  countWallDraw: number,
): ISetCountWallDrawAction => ({
  type: SET_COUNT_WALL_DRAW,
  payload: countWallDraw,
});

export const addElementRoom = (
  roomId: number,
  wallId: number,
  dataElement: any,
  dataElementObj: any,
  idElement: number,
): IAddElementRoom => ({
  type: ADD_ELEMENT_ROOM,
  payload: {roomId, wallId, dataElement, dataElementObj, idElement},
});

export const deleteElement = (
  roomId: number,
  wallId: number,
  elementId: number | null,
  positionEl: number,
): IDeleteElement => ({
  type: DELETE_ELEMENT_ROOM,
  payload: {roomId, wallId, elementId, positionEl},
});

export const setNumberCurrentWall = (
  numberCurrentWall: number,
): ISetActiveWallIndex => ({
  type: SET_ACTIVE_WALL_INDEX,
  payload: numberCurrentWall,
});

export const setVisibleElements = (payload: {
  index: number;
  isVisible: boolean;
}): ISetVisibleElements => ({
  type: SET_VISIBLE_ELEMENTS,
  payload,
});

export const setClickDataWall = (payload: {
  isVisible: boolean;
  nameButton: TClickButtonBlockDimensions;
}): ISetClickDataWall => ({
  type: SET_CLICK_DATA_WALL,
  payload,
});

export const setCurrentRoomId = (payload: any): ISetCurrentRoomId => ({
  type: SET_CURRENT_ROOM_ID,
  payload,
});

export const setDataEditWall = (payload: {
  dataEditWall: any;
  currentWall: number;
}): IsetDataEditWall => ({
  type: SET_DATA_EDIT_WALL,
  payload,
});

export const patchEditRoomRequestAction = (): IPatchEditRoomRequestAction => ({
  type: PATCH_ROOM_REQUEST,
});
export const patchEditRoomFailedAction = (
  error: string,
): IPatchEditRoomFailedAction => ({
  type: PATCH_ROOM_FAILED,
  error,
});
export const patchEditRoomSuccesAction = (payload: {
  dataId: number;
  dataProduct: any;
  numberCurrentWall: number | null;
  activeId: any;
}): IPatchEditRoomSuccessAction => ({
  type: PATCH_ROOM_SUCCESS,
  payload,
});

export const setActiveElementId = (id: number | null): ISetActiveElementId => ({
  type: SET_ACTIVE_ELEMENT_ID,
  payload: id,
});

export function getRoomsInitial() {
  return async function (dispatch: AppDispatch) {
    dispatch(getRoomRequestAction());
    try {
      const accessToken = await getKeychain('accessToken');

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      api.setToken(accessToken); // ✅ установить токен в API перед запросом
      const data = await api.getInitialProducts();
      dispatch(setAuthloggedIn(true));

      if (data?.product && data?.product && Array.isArray(data?.product)) {
        dispatch(setRoomData(data?.product));
      } else {
        console.warn('Некорректный формат данных от API');
        dispatch(getRoomFailedAction('Некорректный формат данных'));
      }
    } catch (error: any) {
      dispatch(getRoomFailedAction(error.message));
    }
  };
}

export function addRoom(name: string, sizeWalls: any) {
  return async function (dispatch: AppDispatch) {
    dispatch(postAddRoomRequestAction());
    try {
      const {dataProduct, name: nameRoom} = await api.addProduct(
        name,
        sizeWalls,
      );
      dispatch(postAddRoomSuccessAction({payload: {nameRoom, dataProduct}}));
      return {dataProduct, nameRoom};
    } catch (error: any) {
      dispatch(postAddRoomFailedAction(error.message));
    }
  };
}

export function editRoom(
  dataProduct: any,
  dataId: any,
  numberCurrentWall: number | null,
  activeId: any,
) {
  return async function (dispatch: AppDispatch) {
    dispatch(patchEditRoomRequestAction());

    try {
      const response = await api.editRoom(dataProduct, dataId);
      // логируем для проверки

      dispatch(
        patchEditRoomSuccesAction(
          {
            dataId,
            dataProduct: response.dataProduct,
            numberCurrentWall,
            activeId,
          }, // можно response.data
        ),
      );
    } catch (error: any) {
      dispatch(patchEditRoomFailedAction(error));
    }
  };
}
