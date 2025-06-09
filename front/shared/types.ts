import {NavigationProp} from '@react-navigation/native';
import {Dispatch, ReactNode, SetStateAction} from 'react';

export enum ObjectStatus {
  Created = 'created',
  Running = 'running',
  Completed = 'completed',
}

export enum PathScreenHeader {
  Search = 'Search',
  Filter = 'Filter',
  Profile = 'Profile',
}

export enum PathScreenAuth {
  Register = 'signin',
  Login = 'Login',
  RestorePassword = 'RestorePassword',
  Success = 'Success',
  NewPassword = 'NewPassword',
}

export enum PathScreen {
  Product = 'Product',
  UnwrappedProduct = 'UnwrappedProduct',
}

export enum StateElement {
  Ventilation = 'ventilation',
  Door = 'elementDoor',
  Window = 'elementWindow',
  Socket = 'elementSocket',
  Battery = 'elementBattery',
}

export enum ChoiceRights {
  Supervisor = 'supervisor',
  Manager = 'manager',
}

export type TStateElement =
  | StateElement.Ventilation
  | StateElement.Door
  | StateElement.Window
  | StateElement.Socket
  | StateElement.Battery;

export enum DasharrayStrokeValue {
  Solid = '0',
  Dotted = '10',
}

export enum ClickSelection {
  Wall = 'wall',
  Button = 'button',
}

export enum ClickButtonBlockDimensions {
  Width = 'width',
  Height = 'height',
  Elements = 'elements',
}

export type TClickButtonBlockDimensions =
  | ClickButtonBlockDimensions.Width
  | ClickButtonBlockDimensions.Height
  | ClickButtonBlockDimensions.Elements;

export interface IMainScreen {
  children: ReactNode;
  mainTitle?: string;
  path?: string;
  navigation?: string;
  textBtn?: string;
  pathLink?: string;
}

export interface ISelectOption {
  text: string;
  id: number;
}

export interface IDataItem {
  id: string;
  name: string;
}

export type RootStackParamList = {
  Login: undefined;
  NewPassword: undefined;
  RegisterScreen: undefined;
  RestorePasswordScreen: undefined;
  Success: undefined;
  SuccessScreen: undefined;
  FormDataAddProduct: undefined;
  Main: undefined;
  UnwrappedProduct: {
    dataProduct: IDrawing[];
    nameRoom: string;
  };
  Product: {productRoom: IProductRoom};
};

export interface IWallSize {
  id: number;
  heightRight: string;
  heightLeft: string;
  widthTop: string;
  widthBottom: string;
  wallAngleDegree?: string;
  radiusWall?: string;
  valueDegree?: string;
  arrElements?: {
    elements?: IElement[];
  };
}

export interface IWall {
  size: IWallSize;
  numberWall: number;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IShape {
  id: number;
  path: string;
  length: number;
  points: IPoint[];
}

export interface IPaths {
  path: string;
  length: number;
}

export interface IDrawingData {
  numberWall: number;
  countWallDraw: number;
  shapes: IShape[];
  walls: IWall[];
}

export interface IDrawing {
  drawingData: IDrawingData;
}

export interface INavigationScreenProps {
  navigation: NavigationProp<RootStackParamList, keyof RootStackParamList>;
  setIsAuthenticated?: any;
}

interface IElementDataObj {
  nameElement: string;
  stateElement: string;
  id: number;
}

export interface IElement {
  data: IElementData;
  dataObj: IElementDataObj;
}

export interface IExternalSizeWall {
  id: number;
  widthTop?: string;
  widthBottom?: string;
  heightRight?: string;
  heightLeft?: string;
  radiusWall?: string;
  valueDegree?: string;
  wallAngleDegree?: string;
}

export interface ISaveSizeWall {
  [key: number]: {
    size: IExternalSizeWall; // Здесь описано, что каждый элемент по индексу содержит объект с `size`
    numberWall: number;
  };
}

export interface IAddBlockDimensions {
  numberWall: number;
  saveSizeWall?: ISaveSizeWall;
  setSizeWalls: Dispatch<SetStateAction<IDrawing[]>>;
  setNumberCurrentWall: Dispatch<SetStateAction<number | boolean | null>>;
  numberCurrentWall: number | boolean | null;
  setModalVisibleBacklight: Dispatch<SetStateAction<number | boolean | null>>;
  modalVisibleBacklight: number | boolean | null;
  onClickWallIncrease: (
    data: IExternalSizeWall | undefined,
    wallIndex: number,
    click: ClickSelection.Wall | ClickSelection.Button,
  ) => void;
  setModalVisible: Dispatch<SetStateAction<number | boolean | null>>;
  modalVisible: number | boolean | null;
  arrElements?: IElement[];
  setIsVisibleEditModal: Dispatch<SetStateAction<boolean>>;
  externalData: IExternalSizeWall | undefined;
  onClickEditDataWall: (size: IExternalSizeWall, currentWall: number) => void;
}

export interface IDataElementsWall {
  id: number;
  nameElement: string;
  stateElement: string;
}

export interface IElementWall {
  numberElement?: number;
  data: IElementData;
  dataObj: IDataElementsWall;
}

export interface IElementData {
  nameElementWall: string;
  heightRight: string;
  widthTop: string;
  widthBottom: string;
  heightLeft: string;
  radiusElement: string;
  locationElementTop: string;
  locationElementRight: string;
  locationElementLeft: string;
  locationElementBottom: string;
}

export interface IProductRoom {
  dataProduct: IDrawing[];
  nameRoom: string;
}
