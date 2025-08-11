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
} from '../constants/constants';

interface IRoomState {
  roomData: IProductRoom[];
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
  elementsData: IElement[];
  countWallDraw: number;
  numberCurrentWall: number;
}
const initialState: any = {
  roomData: [],
  isAuthloggedIn: false,
  success: false,
  loading: false,
  error: '',
  paths: [],
  points: [],
  drawingData: {},
  wallsData: [],
  currentPath: '',
  lastPoint: null as {x: number; y: number} | null,
  sizeWalls: [],
  dataObj: {
    nameElement: '',
    stateElement: '',
    id: 0,
  },
  elementsData: [],
  countWallDraw: 0,
  numberCurrentWall: 0,
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
        roomData: action.payload,
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

    case ADD_OR_UPDATE_ROOM:
      const newRoom = action.payload;

      // Ищем индекс комнаты, которую хотим обновить
      const existingIndex = state.roomData.findIndex(
        (room: {nameRoom: string; owner: string}) =>
          room.nameRoom === newRoom.nameRoom && room.owner === newRoom.owner,
      );

      if (existingIndex !== -1) {
        // Создаем копию массива комнат
        const updatedRooms = [...state.roomData];

        // Обновляем комнату по индексу, копируя данные, чтобы не мутировать state напрямую
        updatedRooms[existingIndex] = {
          ...updatedRooms[existingIndex],
          dataProduct: newRoom.dataProduct, // или другие поля, которые обновляешь
        };

        // Возвращаем новый state с обновленным массивом комнат
        return {
          ...state,
          roomData: updatedRooms,
          loading: false,
        };
      } else {
        // Если комнаты нет, добавляем новую в массив
        return {
          ...state,
          roomData: [...state.roomData, newRoom],
          loading: false,
        };
      }

    case SET_CURRENT_PATH:
      return {...state, currentPath: action.payload};
    case ADD_TO_CURRENT_PATH:
      const {x, y} = action.payload;
      return {
        ...state,
        currentPath: `${state.currentPath} L${Math.round(x)},${Math.round(y)}`,
      };
    case SET_LAST_POINT:
      return {...state, lastPoint: action.payload};

    case PATHS:
      return {
        ...state,
        paths: [...state.paths, action.payload],
      };
    case POINTS:
      return {
        ...state,
        points: [...state.points, action.payload],
      };
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
        sizeWalls: [], // очистка всех сохранённых стен
        countWallDraw: 0, // если есть счётчик стен
        elementsData: [],
        // другие поля если нужны
      };
    case WALLS_DATA:
      const {walls, normalizedSize, numberWallIndex} = action.payload;
      const wallsSafe = Array.isArray(walls) ? walls : [];
      const updatedWalls = wallsSafe.map(wall =>
        wall.numberWall === numberWallIndex - 1
          ? {...wall, size: normalizedSize}
          : wall,
      );
      const wallsArray = wallsSafe.some(
        wall => wall.numberWall === numberWallIndex - 1,
      )
        ? updatedWalls
        : [
            ...wallsSafe,
            {size: normalizedSize, numberWall: numberWallIndex - 1},
          ];

      return {
        ...state,
        wallsData: wallsArray,
      };
    case NOTIFICATION_SAVE_ROOM:
      // Определяем номер стены
      const {points, wallsData} = action.payload;
      const numberWall = state.sizeWalls.length;
      const countWallDraw = state.paths.length;
      // Строим структуру для сохранения

      const drawingData = {
        numberWall,
        countWallDraw,
        shapes: state.paths.map((path: IPaths, index: number) => ({
          id: index + 1,
          path: path.path, // Путь
          length: path.length, // Длина линии
          points: [...points], // Все точки на рисунке
        })),
        walls: JSON.parse(JSON.stringify(wallsData)),
      };

      // Обновляем состояние и передаём в `onSaveSizeWall`
      return {
        ...state,
        sizeWalls: [...(state.sizeWalls ?? []), {drawingData}],
        paths: [],
        points: [],
        currentPath: '',
        lastPoint: null,
      };
    case UPDATE_LAST_DRAWING_WALLS:
      const updatedLastWalls = state.sizeWalls.map(
        (drawing: IDrawing, index: number) => {
          if (index === state.sizeWalls.length - 1) {
            return {
              ...drawing,
              drawingData: {
                ...(drawing.drawingData ?? {}),
                walls: [...action.payload], // Синхронизируем wallsData с drawingData
              },
            };
          }
          return drawing;
        },
      );

      return {...state, sizeWalls: updatedLastWalls};
    case UPDATE_SIZE_WALLS: {
      const {numberCurrentWall, data, dataObj, wallId} = action.payload;

      const newSizeWalls = state.sizeWalls.map(
        (roomWallsObj: any, index: number) => {
          if (index !== wallId) return roomWallsObj;

          // Клонируем drawingData полностью
          const newDrawingData = {
            ...roomWallsObj.drawingData,
            walls: roomWallsObj.drawingData.walls.map((wall: any) => {
              if (wall.size.id === numberCurrentWall) {
                // Клонируем массив элементов, если он есть
                const prevElements = wall.size?.arrElements?.elements
                  ? wall.size.arrElements.elements.map((el: any) => ({...el}))
                  : [];

                return {
                  ...wall,
                  size: {
                    ...wall.size,
                    arrElements: {
                      elements: [
                        ...prevElements,
                        {data: {...data}, dataObj: {...dataObj}},
                      ],
                    },
                  },
                };
              }
              // Клонируем стены без изменений, чтобы не было ссылок
              return {
                ...wall,
                size: {
                  ...wall.size,
                  arrElements: {
                    elements: wall.size?.arrElements?.elements
                      ? wall.size.arrElements.elements.map((el: any) => ({
                          ...el,
                        }))
                      : [],
                  },
                },
              };
            }),
          };

          return {
            ...roomWallsObj,
            drawingData: newDrawingData,
          };
        },
      );

      return {
        ...state,
        sizeWalls: newSizeWalls,
      };
    }

    case DATA_OBJ: {
      return {
        ...state,
        dataObj: {...state.dataObj, ...action.payload},
      };
    }
    case ELEMENTS_DATA: {
      const {data, dataObj, wallId} = action.payload;
      return {
        ...state,
        elementsData: [...state.elementsData, {wallId, data, dataObj}],
      };
    }
    case UPDATE_ELEMENT_ROOM:
      const updatedElements = state.elementsData.map(
        (item: IElement, index: number) =>
          index === action.payload.position
            ? {...item, data: action.payload.updateDate}
            : item,
      );
      return {
        ...state,
        elementsData: updatedElements,
      };

    case SET_COUNT_WALL_DRAW:
      return {
        ...state,
        countWallDraw: action.payload,
      };
    case EDIT_ELEMENT: {
      const {updatedData, dataObj, wallId, elementId} = action.payload;

      const newWalls = state.sizeWalls.map((wall: any) => ({
        ...wall,
        drawingData: {
          ...wall.drawingData,
          walls: wall.drawingData.walls.map((wallData: any) => {
            if (wallData.size.id === wallId) {
              const prevElements = wallData.size?.arrElements?.elements
                ? wallData.size.arrElements.elements.map((el: any) => ({...el}))
                : [];

              return {
                ...wallData,
                size: {
                  ...wallData.size,
                  arrElements: {
                    elements: prevElements.map((el: any, i: any) =>
                      i === elementId
                        ? {data: updatedData, dataObj: dataObj}
                        : el,
                    ),
                  },
                },
              };
            }
            return wallData;
          }),
        },
      }));

      return {...state, sizeWalls: newWalls};
    }
    // case EDIT_ELEMENT:
    //   // Создаем глубокую копию массива стен
    //   const newWalls = state.sizeWalls.map((wall: any, index: number) => {
    //     const updatedDrawingData = {
    //       ...wall.drawingData,
    //       walls:
    //         // Обновляем массив стен внутри drawingData
    //         wall.drawingData.walls.map((wallData: any) => {
    //           // Проверяем, совпадает ли ID стены
    //           if (wallData.size.id === action.payload.wallId) {
    //             // Удаляем элемент с определенным индексом
    //             const updatedElements =
    //               wallData?.size?.arrElements?.elements?.map(
    //                 (item: IElement, index: number) =>
    //                   index === action.payload.elementId
    //                     ? {...item, data: action.payload.updatedData}
    //                     : item,
    //               );
    //             // setElementsData(updatedElements);
    //             return {
    //               ...wallData,
    //               size: {
    //                 ...wallData.size,
    //                 arrElements: {
    //                   ...wallData.size.arrElements,
    //                   elements: updatedElements, // Обновляем элементы без удаленного
    //                 },
    //               },
    //             };
    //           }
    //           return wallData;
    //         }),
    //     };
    //     return {
    //       ...wall,
    //       drawingData: updatedDrawingData,
    //     };
    //   });

    //   // Возвращаем обновленный массив
    //   return {
    //     ...state,
    //     sizeWalls: newWalls,
    //   };
    // case DELETE_ELEMENT_ROOM:
    //   // Создаем глубокую копию массива стен
    //   const updatedElementsRoom =
    //     state.elementsData.filter(
    //       (_: any, index: number) => index !== action.payload.elementId,
    //     ) || [];
    //   const newWallsWithElements = state.sizeWalls.map((wall: any) => {
    //     const updatedDrawingData = {
    //       ...wall.drawingData,

    //       // Обновляем массив стен внутри drawingData
    //       walls: wall.drawingData.walls.map((wallData: any) => {
    //         // Проверяем, совпадает ли ID стены
    //         if (wallData.size.id === action.payload.wallId) {
    //           // Удаляем элемент с определенным индексом

    //           console.log(updatedElements, 'updatedElements');
    //           // setElementsData(updatedElements);
    //           return {
    //             ...wallData,
    //             size: {
    //               ...wallData.size,
    //               arrElements: {
    //                 ...wallData.size.arrElements,
    //                 elements: updatedElementsRoom, // Обновляем элементы без удаленного
    //               },
    //             },
    //           };
    //         }
    //         return wallData;
    //       }),
    //     };

    //     return {
    //       ...wall,
    //       drawingData: updatedDrawingData,
    //     };
    //   });

    //   // return newWallsWithElements; // Возвращаем обновленный массив
    //   return {
    //     ...state,
    //     sizeWalls: newWallsWithElements,
    //     elementsData: updatedElementsRoom,
    //   };
    case DELETE_ELEMENT_ROOM: {
      const {wallId, elementId} = action.payload;

      const newWalls = state.sizeWalls.map((wall: any) => ({
        ...wall,
        drawingData: {
          ...wall.drawingData,
          walls: wall.drawingData.walls.map((wallData: any) => {
            if (wallData.size.id === wallId) {
              const prevElements = wallData.size?.arrElements?.elements
                ? wallData.size.arrElements.elements.map((el: any) => ({...el}))
                : [];

              return {
                ...wallData,
                size: {
                  ...wallData.size,
                  arrElements: {
                    elements: prevElements.filter(
                      (_: any, i: any) => i !== elementId,
                    ),
                  },
                },
              };
            }
            return wallData;
          }),
        },
      }));

      return {...state, sizeWalls: newWalls};
    }
    case SET_ACTIVE_WALL_INDEX:
      return {
        ...state,
        numberCurrentWall: action.payload,
      };
    default:
      return state;
  }
};
