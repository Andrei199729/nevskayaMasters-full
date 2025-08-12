import {
  IDataElementsWall,
  IDrawing,
  IDrawingData,
  IElement,
  IPaths,
  IPoint,
  IProductRoom,
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
  EDIT_ELEMENT,
  DELETE_ELEMENT_ROOM,
  SET_ACTIVE_WALL_INDEX,
  RESET_CURRENT_DRAWING,
  SET_VISIBLE_ELEMENTS,
  SET_CLICK_DATA_WALL,
  SET_CURRENT_ROOM_ID,
} from '../constants/constants';

interface IRoomState {
  roomData: any;
  isAuthloggedIn: boolean;
  success: boolean;
  loading: boolean;
  error: string;
  sizeWalls: IDrawing[];
  paths: IPaths[];
  points: IPoint[];
  drawingData?: IDrawingData | null;
  wallsData: IWall[];
  currentPath: string;
  lastPoint: IPoint | null;
  dataObj: IDataElementsWall;
  elementsData: any[];
  countWallDraw: number;
  numberCurrentWall: number;
  visibleElements: {[key: number]: boolean};
  clickDataWall: {[key: string]: boolean};
  currentRoomId: any;
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
  currentRoomId: null,
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

      const drawingData = {
        numberWall,
        countWallDraw,
        shapes: state.paths.map((path, index) => ({
          id: index + 1,
          path: path.path,
          length: path.length,
          points: [...points],
        })),
        walls: wallsData.map((wall: any) => ({...wall})), // копия массива стен
      };

      return {
        ...state,
        sizeWalls: [...state.sizeWalls, {drawingData}],
        paths: [],
        points: [],
        currentPath: '',
        lastPoint: null,
      };
    }

    case UPDATE_LAST_DRAWING_WALLS: {
      const updatedSizeWalls = state.sizeWalls.map((drawing, index) => {
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
      });

      return {...state, sizeWalls: updatedSizeWalls};
    }

    // case UPDATE_SIZE_WALLS: {
    //   const {numberCurrentWall, data, dataObj, wallId} = action.payload;

    //   const updatedSizeWalls = state.sizeWalls.map((room, index) => {
    //     if (index !== wallId) return room;

    //     return {
    //       ...room,
    //       drawingData: {
    //         ...room.drawingData,
    //         walls: room.drawingData.walls.map(wall => {
    //           // Получаем безопасный массив элементов (если arrElements или elements нет, берем пустой массив)
    //           const elements = wall.size?.arrElements?.elements ?? [];

    //           if (wall.size.id !== numberCurrentWall) {
    //             return {
    //               ...wall,
    //               size: {
    //                 ...wall.size,
    //                 arrElements: {
    //                   elements: elements.map(el => ({...el})),
    //                 },
    //               },
    //             };
    //           }

    //           return {
    //             ...wall,
    //             size: {
    //               ...wall.size,
    //               arrElements: {
    //                 elements: [
    //                   ...elements.map(el => ({...el})),
    //                   {data: {...data}, dataObj: {...dataObj}},
    //                 ],
    //               },
    //             },
    //           };
    //         }),
    //       },
    //     };
    //   });

    //   return {...state, sizeWalls: updatedSizeWalls};
    // }
    case UPDATE_SIZE_WALLS: {
      const {numberCurrentWall, data, dataObj} = action.payload;

      const newWalls = state.sizeWalls.map((wall: any, index: any) => {
        const updatedDrawingData = {
          ...wall.drawingData,
          walls: wall.drawingData.walls.map((wallData: any) => {
            const prevElements = wallData.size?.arrElements?.elements ?? [];
            console.log(wallData.size.id, 'wallData.size.id');
            console.log(numberCurrentWall, 'numberCurrentWall');

            if (wallData.size.id === numberCurrentWall) {
              return {
                ...wallData,
                size: {
                  ...wallData.size,
                  arrElements: {
                    elements: [...prevElements, {data, dataObj}],
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
      const updatedElements = state.elementsData.map((item, index) =>
        index === action.payload.position
          ? {...item, data: action.payload.updateDate}
          : item,
      );
      return {
        ...state,
        elementsData: updatedElements,
      };
    }

    case SET_COUNT_WALL_DRAW:
      return {
        ...state,
        countWallDraw: action.payload,
      };

    case EDIT_ELEMENT: {
      const {updatedData, dataObj, wallId, elementId} = action.payload;

      const newSizeWalls = state.sizeWalls.map(wall => ({
        ...wall,
        drawingData: {
          ...wall.drawingData,
          walls: wall.drawingData.walls.map(wallData => {
            if (wallData.size.id === wallId) {
              const updatedElements = wallData.size?.arrElements?.elements
                ? wallData.size.arrElements.elements.map((el, i) =>
                    i === elementId ? {data: updatedData, dataObj} : {...el},
                  )
                : [];

              return {
                ...wallData,
                size: {
                  ...wallData.size,
                  arrElements: {
                    elements: updatedElements,
                  },
                },
              };
            }
            return wallData;
          }),
        },
      }));

      return {...state, sizeWalls: newSizeWalls};
    }

    case DELETE_ELEMENT_ROOM: {
      const {wallId, elementId} = action.payload;

      const newSizeWalls = state.sizeWalls.map(wall => ({
        ...wall,
        drawingData: {
          ...wall.drawingData,
          walls: wall.drawingData.walls.map(wallData => {
            if (wallData.size.id === wallId) {
              const filteredElements = wallData.size?.arrElements?.elements
                ? wallData.size.arrElements.elements.filter(
                    (_, i) => i !== elementId,
                  )
                : [];

              return {
                ...wallData,
                size: {
                  ...wallData.size,
                  arrElements: {
                    elements: filteredElements,
                  },
                },
              };
            }
            return wallData;
          }),
        },
      }));

      return {...state, sizeWalls: newSizeWalls};
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
    default:
      return state;
  }
};
