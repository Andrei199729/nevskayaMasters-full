import {
  IDataElementsWall,
  IDrawing,
  IDrawingData,
  IElement,
  IPaths,
  IPoint,
  IWall,
} from '../../shared/types';
import {TRoomAction} from '../actions/room';
import {
  ADD_OR_UPDATE_ROOM,
  PATHS,
  ADD_TO_CURRENT_PATH,
  GET_ROOM_FAILED,
  GET_ROOM_REQUEST,
  NOTIFICATION_SAVE_ROOM,
  SET_AUTH_LOGGED_IN,
  SET_CURRENT_PATH,
  SET_LAST_POINT,
  SET_ROOM_DATA,
  WALLS_DATA,
  CLEAR_PATHS,
  POINTS,
  CLEAR_POINTS,
  UPDATE_LAST_DRAWING_WALLS,
  UPDATE_SIZE_WALLS,
  DATA_OBJ,
  ELEMENTS_DATA,
  UPDATE_ELEMENT_ROOM,
  SET_COUNT_WALL_DRAW,
  // EDIT_ELEMENT,
  DELETE_ELEMENT_ROOM,
  SET_ACTIVE_WALL_INDEX,
  RESET_CURRENT_DRAWING,
  SET_VISIBLE_ELEMENTS,
  SET_CLICK_DATA_WALL,
  SET_CURRENT_ROOM_ID,
  SET_DATA_EDIT_WALL,
  PATCH_ROOM_REQUEST,
  PATCH_ROOM_SUCCESS,
  PATCH_ROOM_FAILED,
  SET_ACTIVE_ELEMENT_ID,
  ADD_ELEMENT_ROOM,
} from '../constants/constants';

interface IRoomState {
  roomData: any;
  isAuthloggedIn: boolean;
  success: boolean;
  loading: boolean;
  error: string;
  sizeWalls: any;
  paths: IPaths[];
  points: IPoint[];
  drawingData?: IDrawingData | null;
  wallsData: IWall[];
  currentPath: string;
  lastPoint: IPoint | null;
  dataObj: IDataElementsWall;
  elementsData: IElement[];
  countWallDraw: number;
  numberCurrentWall: number;
  visibleElements: {[key: number]: boolean};
  clickDataWall: {[key: string]: boolean};
  currentRoomId: number;
  dataWall: {
    dataEditWall: any;
    currentWall: number;
  };
  activeElementId: number | null;
}

const initialState: IRoomState = {
  roomData: [],
  isAuthloggedIn: false,
  success: false,
  loading: false,
  error: '',
  paths: [],
  points: [],
  drawingData: null,
  wallsData: [],
  currentPath: '',
  lastPoint: null,
  sizeWalls: [],
  dataObj: {
    nameElement: '',
    stateElement: '',
    id: 0,
  },
  elementsData: [],
  countWallDraw: 0,
  numberCurrentWall: 0,
  visibleElements: {},
  clickDataWall: {},
  currentRoomId: 0,
  dataWall: {
    dataEditWall: {},
    currentWall: 0,
  },
  activeElementId: null,
};

export const roomReducer = (
  state = initialState,
  action: TRoomAction,
): IRoomState => {
  switch (action.type) {
    case SET_AUTH_LOGGED_IN:
      return {
        ...state,
        isAuthloggedIn: action.authloggedIn,
      };

    case SET_ROOM_DATA:
      return {
        ...state,
        roomData: Array.isArray(action.payload)
          ? action.payload
          : [action.payload], // создаём новый массив
        loading: false,
      };

    case GET_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ROOM_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case ADD_OR_UPDATE_ROOM: {
      const newRoom = action.payload;

      const existingIndex = state.roomData.findIndex(
        (room: any) =>
          room.nameRoom === newRoom.nameRoom && room.owner === newRoom.owner,
      );

      if (existingIndex !== -1) {
        const updatedRooms = [...state.roomData];
        updatedRooms[existingIndex] = {
          ...updatedRooms[existingIndex],
          dataProduct: newRoom.dataProduct,
          // Добавь остальные нужные поля из newRoom здесь
        };
        return {
          ...state,
          roomData: updatedRooms,
          loading: false,
        };
      }

      return {
        ...state,
        roomData: [...state.roomData, newRoom],
        loading: false,
      };
    }

    case SET_CURRENT_PATH:
      return {...state, currentPath: action.payload};

    case ADD_TO_CURRENT_PATH: {
      const {x, y} = action.payload;
      return {
        ...state,
        currentPath: `${state.currentPath} L${Math.round(x)},${Math.round(y)}`,
      };
    }

    // case SET_LAST_POINT:
    //   return {...state, lastPoint: action.payload};
    case SET_LAST_POINT:
      if (Array.isArray(action.payload)) {
        console.warn('lastPoint должен быть объектом, а не массивом');
        return state;
      }
      return {...state, lastPoint: action.payload};
    case PATHS:
      return {
        ...state,
        paths: [...state.paths, {...action.payload}],
      };

    case POINTS:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          points: [...state.points, ...action.payload],
        };
      } else {
        return {
          ...state,
          points: [...state.points, action.payload],
        };
      }

    case CLEAR_PATHS:
      return {
        ...state,
        paths: [],
      };

    case CLEAR_POINTS:
      return {
        ...state,
        points: [],
      };

    case RESET_CURRENT_DRAWING:
      return {
        ...state,
        paths: [],
        points: [],
        wallsData: [],
        sizeWalls: [],
        countWallDraw: 0,
        elementsData: [],
        dataWall: {
          dataEditWall: {},
          currentWall: 0,
        },
      };

    case WALLS_DATA: {
      const {walls, normalizedSize, numberWallIndex} = action.payload;

      const wallsSafe = Array.isArray(walls) ? walls : [];
      const safeNormalizedSize = {
        ...normalizedSize,
        id: normalizedSize.id ?? 0,
      };
      const hasWall = wallsSafe.some(
        wall => wall.numberWall === numberWallIndex - 1,
      );

      const updatedWalls = hasWall
        ? wallsSafe.map(wall =>
            wall.numberWall === numberWallIndex - 1
              ? {...wall, size: safeNormalizedSize}
              : {...wall},
          )
        : [
            ...wallsSafe,
            {size: safeNormalizedSize, numberWall: numberWallIndex - 1},
          ];

      return {
        ...state,
        wallsData: updatedWalls,
      };
    }

    case NOTIFICATION_SAVE_ROOM: {
      const {points, wallsData} = action.payload;

      const numberWall = state.sizeWalls.length;
      const countWallDraw = state.paths.length;

      // Создаём чистые стены без старых элементов
      const cleanWalls = wallsData.map((wall: any) => ({
        ...wall,
        size: {
          ...wall.size,
          arrElements: {elements: []}, // очищаем элементы
        },
      }));
      const newElementsData = cleanWalls.flatMap((wall: any, wallId: any) =>
        wall.size.arrElements.elements.map((el: any, idx: number) => ({
          ...el,
          wallId,
          position: idx,
        })),
      );
      const drawingData = {
        numberWall,
        countWallDraw,
        shapes: state.paths.map((path, index) => ({
          id: index + 1,
          path: path.path,
          length: path.length,
          points: [...points],
        })),
        walls: cleanWalls, // используем чистые стены
      };

      return {
        ...state,
        sizeWalls: [...state.sizeWalls, {drawingData}],
        paths: [],
        points: [],
        currentPath: '',
        lastPoint: null,
        wallsData: [], // очищаем текущие wallsData
        elementsData: [...state.elementsData, ...newElementsData], // очищаем глобальные элементы
      };
    }

    case UPDATE_LAST_DRAWING_WALLS: {
      const updatedSizeWalls = state.sizeWalls.map(
        (drawing: {drawingData: any}, index: number) => {
          if (index === state.sizeWalls.length - 1) {
            return {
              ...drawing,
              drawingData: {
                ...(drawing.drawingData ?? {}),
                walls: action.payload.map(wall => ({...wall})),
              },
            };
          }
          return drawing;
        },
      );

      return {...state, sizeWalls: updatedSizeWalls};
    }

    case UPDATE_SIZE_WALLS: {
      const {numberCurrentWall, data, dataObj} = action.payload;

      const newWalls = state.sizeWalls.map((wall: any, index: any) => {
        const updatedDrawingData = {
          ...wall.drawingData,
          walls: wall.drawingData.walls.map((wallData: any) => {
            const prevElements = wallData.size?.arrElements?.elements ?? [];
            const idElement = (numberCurrentWall + 33) * 1000 + Date.now() * 33;

            if (wallData.size.id === numberCurrentWall) {
              return {
                ...wallData,
                size: {
                  ...wallData.size,
                  arrElements: {
                    elements: [...prevElements, {id: idElement, data, dataObj}],
                  },
                },
              };
            }

            return wallData;
          }),
        };

        return {
          ...wall,
          drawingData: updatedDrawingData,
        };
      });

      return {...state, sizeWalls: newWalls};
    }
    case DATA_OBJ:
      return {
        ...state,
        dataObj: {...state.dataObj, ...action.payload},
      };

    case ELEMENTS_DATA: {
      const {data, dataObj, wallId, roomIndex} = action.payload;
      return {
        ...state,
        elementsData: [
          ...state.elementsData,
          {wallId, roomIndex, data, dataObj},
        ],
      };
    }

    case UPDATE_ELEMENT_ROOM: {
      const {roomId, numberWall, updatedData, numberEl} = action.payload;

      if (numberEl === null || numberEl === undefined) return state; // если элемент не выбран, ничего не делаем

      const updatedRooms = state.roomData.map((room: any, index: number) => {
        if (index !== roomId) return room;

        const updatedDataProduct = room.dataProduct.map((drawing: any) => {
          const updatedWalls = drawing.drawingData.walls.map((wall: any) => {
            if (wall.numberWall !== numberWall) return wall;

            const updatedElements =
              wall.size.arrElements?.elements?.map((el: any) =>
                el.id === numberEl ? {...el, data: updatedData} : el,
              ) || [];

            return {
              ...wall,
              size: {
                ...wall.size,
                arrElements: {elements: updatedElements},
              },
            };
          });

          return {
            ...drawing,
            drawingData: {
              ...drawing.drawingData,
              walls: updatedWalls,
            },
          };
        });

        return {...room, dataProduct: updatedDataProduct};
      });

      return {...state, roomData: updatedRooms};
    }

    case SET_COUNT_WALL_DRAW:
      return {
        ...state,
        countWallDraw: action.payload,
      };

    case DELETE_ELEMENT_ROOM: {
      const {roomId, wallId, elementId, positionEl} = action.payload;
      if (elementId === null || elementId === undefined) return state;
      const updatedRooms = state.roomData.map((room: any, index: number) => {
        if (index !== roomId) return room;
        const updatedDataProduct = room.dataProduct.map((drawing: any) => {
          const updatedWalls = drawing.drawingData.walls.map((wall: any) => {
            if (wall.numberWall !== wallId) return wall;
            const updatedElements = wall.size.arrElements?.elements?.filter(
              (el: any) => {
                return el.id !== elementId;
              },
            );

            return {
              ...wall,
              size: {
                ...wall.size,
                arrElements: {elements: updatedElements},
              },
            };
          });
          return {
            ...drawing,
            drawingData: {
              ...drawing.drawingData,
              walls: updatedWalls,
            },
          };
        });
        return {
          ...room,
          dataProduct: updatedDataProduct,
        };
      });
      return {...state, roomData: updatedRooms};
    }

    case ADD_ELEMENT_ROOM: {
      const {roomId, wallId, dataElement, dataElementObj, idElement} =
        action.payload;
      const updatedRooms = state.roomData.map((room: any, index: number) => {
        if (index !== roomId) return room;
        const updatedDataProduct = room.dataProduct.map((drawing: any) => {
          const updatedWalls = drawing.drawingData.walls.map(
            (wall: any, index: number) => {
              const prevElements = wall.size?.arrElements?.elements ?? [];
              console.log(prevElements, 'prevElements');

              if (wall.numberWall !== wallId) return wall;
              return {
                ...wall,
                size: {
                  ...wall.size,
                  arrElements: {
                    elements: [
                      ...prevElements,
                      {
                        id: idElement,
                        data: dataElement,
                        dataObj: dataElementObj,
                      },
                    ],
                  },
                },
              };
            },
          );
          return {
            ...drawing,
            drawingData: {
              ...drawing.drawingData,
              walls: updatedWalls,
            },
          };
        });
        return {
          ...room,
          dataProduct: updatedDataProduct,
        };
      });
      return {...state, roomData: updatedRooms};
    }

    case SET_ACTIVE_WALL_INDEX:
      return {
        ...state,
        numberCurrentWall: action.payload,
      };
    case SET_VISIBLE_ELEMENTS:
      return {
        ...state,
        visibleElements: {
          ...state.visibleElements,
          [action.payload.index]: action.payload.isVisible,
        },
      };
    case SET_CLICK_DATA_WALL:
      return {
        ...state,
        clickDataWall: {
          ...state.clickDataWall,
          [action.payload.nameButton]: action.payload.isVisible, // Устанавливаем видимость только для конкретного элемента
        },
      };
    case SET_CURRENT_ROOM_ID:
      return {...state, currentRoomId: action.payload};
    case SET_DATA_EDIT_WALL:
      return {
        ...state,
        dataWall: {
          ...state.dataWall,
          dataEditWall: action.payload.dataEditWall,
          currentWall: action.payload.currentWall,
        },
      };
    case PATCH_ROOM_REQUEST:
      return {...state, loading: true};

    case PATCH_ROOM_SUCCESS: {
      const {dataId, dataProduct, numberCurrentWall, activeId} = action.payload;

      const updatedRooms = state.roomData.map((room: any) =>
        room._id === dataId
          ? {
              ...room,
              dataProduct, // вот это обновляем
            }
          : room,
      );

      return {
        ...state,
        roomData: updatedRooms,
        loading: false,
        success: true,
      };
    }

    case PATCH_ROOM_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_ACTIVE_ELEMENT_ID:
      return {
        ...state,
        activeElementId: action.payload,
      };
    default:
      return state;
  }
};
